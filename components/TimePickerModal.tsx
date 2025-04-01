import React from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface TimePickerModalProps {
  visible: boolean;
  selectedTime: Date;
  onCancel: () => void;
  onConfirm: (date: Date) => void;
  onTimeChange: (date: Date) => void;
}

const TimePickerModal: React.FC<TimePickerModalProps> = ({
  visible,
  selectedTime,
  onCancel,
  onConfirm,
  onTimeChange
}) => {
  if (!visible) return null;
  
  if (Platform.OS === 'ios') {
    return (
      <Modal
        transparent={true}
        visible={visible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={onCancel}>
                <Text style={styles.cancelButton}>キャンセル</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>時間を選択</Text>
              <TouchableOpacity onPress={() => onConfirm(selectedTime)}>
                <Text style={styles.doneButton}>完了</Text>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display="spinner"
              onChange={(_, date) => date && onTimeChange(date)}
              locale="ja"
              minuteInterval={10}
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

const styles = StyleSheet.create({
  // モーダル関連のスタイル
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18, 
    fontWeight: '500',
    color: '#333',
  },
  cancelButton: {
    fontSize: 16,
    color: '#999',
  },
  doneButton: {
    fontSize: 16,
    color: '#6a9eda',
    fontWeight: '600',
  }
});

export default TimePickerModal
