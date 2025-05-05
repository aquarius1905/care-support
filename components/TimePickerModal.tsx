import { Modal, Platform, Text, TouchableOpacity, View } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import TimePickerModalStyles from '@/styles/TimePickerModalStyles';

interface TimePickerModalProps {
  visible: boolean;
  selectedTime: Date;
  onCancel: () => void;
  onConfirm: (date: Date) => void;
  onTimeChange: (date: Date) => void;
  title?: string;
  cancelText?: string;
  confirmText?: string;
  minuteInterval?: 5 | 10 | 15 | 20 | 30;
}

const TimePickerModal: React.FC<TimePickerModalProps> = ({
  visible,
  selectedTime,
  onCancel,
  onConfirm,
  onTimeChange,
  title = '時間を選択',
  cancelText = 'キャンセル',
  confirmText = '完了',
  minuteInterval = 10
}) => {
  if (!visible) return null;
  
  if (Platform.OS === 'ios') {
    return (
      <Modal
        transparent={true}
        visible={visible}
        animationType="slide"
      >
        <View style={TimePickerModalStyles.modalContainer}>
          <View style={TimePickerModalStyles.modalContent}>
            <View style={TimePickerModalStyles.modalHeader}>
              <TouchableOpacity onPress={onCancel}>
                <Text style={TimePickerModalStyles.cancelButton}>{cancelText}</Text>
              </TouchableOpacity>
              <Text style={TimePickerModalStyles.modalTitle}>{title}</Text>
              <TouchableOpacity onPress={() => onConfirm(selectedTime)}>
                <Text style={TimePickerModalStyles.doneButton}>{confirmText}</Text>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display="spinner"
              onChange={(_, date) => date && onTimeChange(date)}
              locale="ja"
              minuteInterval={minuteInterval}
            />
          </View>
        </View>
      </Modal>
    );
  } else {
    // Android
    return (
      <DateTimePicker
        value={selectedTime}
        mode="time"
        is24Hour={true}
        display="default"
        onChange={(_, date) => {
          if (date) {
            onConfirm(date);
          } else {
            onCancel();
          }
        }}
      />
    );
  }
};

export default TimePickerModal;