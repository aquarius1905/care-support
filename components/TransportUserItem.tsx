import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TransportUser as AppointmentItemType } from '@/types';

interface TransportUserItemProps {
  item: AppointmentItemType;
  onTimePress: (id: number, time: string) => void;
}

const TransportUserItem: React.FC<TransportUserItemProps> = ({ item, onTimePress }) => {
  return (
    <View style={styles.item}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.timeLabel}>送迎時間</Text>
          <TouchableOpacity onPress={() => onTimePress(item.id, item.time)}>
            <View style={styles.timeButton}>
              <Text style={styles.time}>{item.time}</Text>
              <Text style={styles.editText}>変更</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    marginVertical: 12,
    borderRadius: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#447FFF',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  timeLabel: {
    fontSize: 16,
    color: '#447FFF',
    marginRight: 8,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f5ff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  time: {
    fontSize: 20,
    color: '#4a6fa5',
    fontWeight: '500',
  },
  editText: {
    fontSize: 12,
    color: '#6a9eda',
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default TransportUserItem;