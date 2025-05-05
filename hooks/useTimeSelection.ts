import { useState } from 'react';

interface TimeSelectionOptions {
  onConfirm: (userId: number, newTime: string) => Promise<void>;
}

export const useTimeSelection = ({ onConfirm }: TimeSelectionOptions) => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState(new Date());

  // 時間選択モーダルを開く
  const openTimePicker = (id: number, timeString: string) => {
    // 現在の時間文字列をDateオブジェクトに変換
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    
    setSelectedTime(date);
    setSelectedUserId(id);
    setShowTimePicker(true);
  };

  // 時間変更をキャンセル
  const handleTimeCancel = () => {
    setShowTimePicker(false);
  };

  // 時間変更（ピッカー操作中）
  const handleTimeChange = (date: Date) => {
    setSelectedTime(date);
  };

  // 時間変更を確定
  const handleTimeConfirm = async (selectedDate: Date) => {
    if (selectedUserId) {
      const newTime = `${String(selectedDate.getHours()).padStart(2, '0')}:${String(selectedDate.getMinutes()).padStart(2, '0')}`;
      await onConfirm(selectedUserId, newTime);
    }
    setShowTimePicker(false);
  };

  return {
    showTimePicker,
    selectedTime,
    openTimePicker,
    handleTimeCancel,
    handleTimeChange,
    handleTimeConfirm
  };
};