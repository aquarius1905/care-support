import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView, StatusBar, Alert, View, ActivityIndicator } from 'react-native';
import Toast from 'react-native-root-toast';
import { TransportUser } from '@/types';
import Header from '@/components/Header';
import TransportUserItem from '@/components/TransportUserItem';
import TimePickerModal from '@/components/TimePickerModal';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
// APIヘルパーをインポート
import { get, patch } from '@/utils/api';

// トースト表示用のヘルパー関数
const showToast = (message: string, isSuccess: boolean = true) => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: isSuccess ? '#4CAF50' : '#F44336', // 成功は緑、失敗は赤
    textStyle: {
      fontSize: 40,
      fontWeight: 'bold',
    },
    containerStyle: {
      padding: 15,
      borderRadius: 10,
    },
  });
};

export default function UserList() {
  const [transportUsers, setTransportUsers] = useState<TransportUser[]>([]);
  // 時間選択用の状態
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedUserId, setSelectedAppointmentId] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true); // ローディング状態を追加
  const { isAuthenticated, logout } = useAuth(); // ログアウト関数を取得

  // APIからその日の送迎者一覧を取得
  useEffect(() => {
    const fetchTransportUsers = async () => {
      setIsLoading(true); // データ取得開始時にローディング表示
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      try {
        // get関数を使用
        const data = await get(`/transport-schedules/?date=${today}`);
        
        if(data.results.length === 0) {
          showToast('送迎者がいません', false);
          setIsLoading(false);
          return;
        }
        
        const mapped = data.results.map((item: any) => ({
          id: item.id,
          name: item.user_name,
          time: new Date(item.scheduled_transport_datetime).toLocaleTimeString('ja-JP', {hour: '2-digit', minute: '2-digit'})
        }));
        
        setTransportUsers(mapped);
      } catch (error) {
        console.error(error);
        // 認証エラーの場合
        if (error instanceof Error && error.message === '認証エラー') {
          showToast('認証エラー：再度ログインしてください', false);
          router.replace('/login');
          return;
        }
        showToast('データの取得に失敗しました', false);
      } finally {
        setIsLoading(false); // データ取得完了時にローディング非表示
      }
    };

    if (isAuthenticated) {
      console.log("認証済み - API呼び出し開始");
      fetchTransportUsers();
    } else {
      console.log("未認証 - API呼び出しスキップ");
      setIsLoading(true); // 認証されていない場合はローディング表示
    }
    
  }, [isAuthenticated]);

  // ログアウト処理
  const handleLogout = () => {
    Alert.alert(
      "ログアウト確認",
      "ログアウトしますか？",
      [
        { text: "キャンセル", style: "cancel" },
        { 
          text: "ログアウト", 
          style: "destructive",
          onPress: async () => {
            try {
              await logout();
              showToast('ログアウトしました', true);
              router.replace('/login');
            } catch (error) {
              console.error(error);
              showToast('ログアウトに失敗しました', false);
            }
          }
        }
      ]
    );
  };

  // 時間変更API呼び出し
  const updateTransportTime = async (id: number, newTime: string) => {
    try {
      // APIヘルパーを使用して更新
      const response = await patch(`/transport-schedules/${id}/`, {
        time: newTime
      });
      
      // 成功したら画面のデータを更新
      setTransportUsers(prev =>
        prev.map(user =>
          user.id === id ? { ...user, time: newTime } : user
        )
      );
      
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  
  // 時間編集モーダルを開く
  const openTimePicker = (id: number, timeString: string) => {
    // 現在の時間文字列をDateオブジェクトに変換
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    
    setSelectedTime(date);
    setSelectedAppointmentId(id);
    setShowTimePicker(true);
  };

  // 時間変更を確定
  const confirmTimeChange = async (selectedDate: Date) => {
    if (selectedUserId) {
      try {
        const newTime = `${String(selectedDate.getHours()).padStart(2, '0')}:${String(selectedDate.getMinutes()).padStart(2, '0')}`;
        const success = await updateTransportTime(selectedUserId, newTime);

        if (success) {
          showToast('送迎時間を更新しました', true);
        } else {
          showToast('送迎時間の変更に失敗しました', false);
        }
      } catch (error) {
        showToast('送迎時間の変更に失敗しました', false);
      }
    }
    setShowTimePicker(false);
  };

  // キャンセル処理
  const cancelTimeChange = () => {
    setShowTimePicker(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="ご利用者様一覧" 
        showLogout={true}
        onLogout={handleLogout}
      />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#447FFF" />
        </View>
      ) : (
        <FlatList<TransportUser>
          data={transportUsers}
          renderItem={({ item }) => (
            <TransportUserItem
              item={item}
              onTimePress={openTimePicker}
            />
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}

      <TimePickerModal
        visible={showTimePicker}
        selectedTime={selectedTime}
        onCancel={cancelTimeChange}
        onConfirm={confirmTimeChange}
        onTimeChange={setSelectedTime}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f6ff',
    paddingTop: StatusBar.currentHeight || 0,
  },
  list: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});