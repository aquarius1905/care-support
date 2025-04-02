import React, { useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView, StatusBar } from 'react-native';
import Toast from 'react-native-root-toast';
import { useTransportUsers } from '@/hooks/useTransportUsers';
import { TransportUser } from '@/types';
import Header from '@/components/Header';
import TransportUserItem from '@/components/TransportUserItem';
import TimePickerModal from '@/components/TimePickerModal';

const initialTransportUsers: TransportUser[] = [
  { id: 1, name: "田中 太郎", time: "08:30" },
  { id: 2, name: "佐藤 花子", time: "09:00" }
];

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

export default function App() {
  const { transportUsers, updateTransportTime } = useTransportUsers(initialTransportUsers);

  // 時間選択用の状態
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedUserId, setSelectedAppointmentId] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState(new Date());

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
  const confirmTimeChange = (selectedDate: Date) => {
    if (selectedUserId) {
      try {
        const newTime = `${String(selectedDate.getHours()).padStart(2, '0')}:${String(selectedDate.getMinutes()).padStart(2, '0')}`;
        updateTransportTime(selectedUserId, newTime);

        showToast('送迎時間を更新しました', true);
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
      <Header title="ご利用者様一覧" />

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
});