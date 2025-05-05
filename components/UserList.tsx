import { ActivityIndicator, Alert, FlatList, SafeAreaView, Text, View } from 'react-native';
import React, { useState } from 'react';

import Header from '@/components/Header';
import TimePickerModal from '@/components/TimePickerModal';
import { TransportUser } from '@/types';
import TransportUserItem from '@/components/TransportUserItem';
import UserListStyles from '@/styles/UserListStyles';
import { router } from 'expo-router';
import showToast from '@/utils/showToast';
import { useAuth } from '@/contexts/AuthContext';
import { useTransportUsers } from '@/hooks/useTransportUsers';

export default function UserList() {
  // カスタムフックを使用してデータと状態を管理
  const { transportUsers, isLoading, error, updateTransportTime, refreshTransportUsers } = useTransportUsers();
  
  // 時間選択用の状態
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState(new Date());
  
  const { logout } = useAuth(); // ログアウト関数を取得

  // エラーハンドリング - 認証エラーは自動的にログイン画面へリダイレクト
  React.useEffect(() => {
    if (error && error.includes('認証エラー')) {
      showToast(error, false);
      router.replace('/login');
    } else if (error) {
      showToast(error, false);
    }
  }, [error]);

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
  
  // 時間編集モーダルを開く
  const openTimePicker = (id: number, timeString: string) => {
    // 現在の時間文字列をDateオブジェクトに変換
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    
    setSelectedTime(date);
    setSelectedUserId(id);
    setShowTimePicker(true);
  };

  // 時間変更を確定
  const confirmTimeChange = async (selectedDate: Date) => {
    if (selectedUserId) {
      const newTime = `${String(selectedDate.getHours()).padStart(2, '0')}:${String(selectedDate.getMinutes()).padStart(2, '0')}`;
      const success = await updateTransportTime(selectedUserId, newTime);

      if (success) {
        showToast('送迎時間を更新しました', true);
      } else {
        showToast('送迎時間の変更に失敗しました', false);
      }
    }
    setShowTimePicker(false);
  };

  return (
    <SafeAreaView style={UserListStyles.container}>
      <Header 
        title="送迎対象者一覧" 
        showLogout={true}
        onLogout={handleLogout}
      />

      {!isLoading && transportUsers.length === 0 && (
        <Text style={UserListStyles.emptyMessage}>送迎対象者はいません</Text>
      )}

      {isLoading ? (
        <View style={UserListStyles.loadingContainer}>
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
          contentContainerStyle={UserListStyles.list}
          onRefresh={refreshTransportUsers}
          refreshing={isLoading}
        />
      )}

      <TimePickerModal
        visible={showTimePicker}
        selectedTime={selectedTime}
        onCancel={() => setShowTimePicker(false)}
        onConfirm={confirmTimeChange}
        onTimeChange={setSelectedTime}
        title="送迎時間を選択"
      />
    </SafeAreaView>
  );
}