import { StyleSheet } from 'react-native';

const TimePickerModalStyles = StyleSheet.create({
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

export default TimePickerModalStyles;