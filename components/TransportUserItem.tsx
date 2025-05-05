import { Text, TouchableOpacity, View } from 'react-native';

import { TransportUser as AppointmentItemType } from '@/types';
import React from 'react';
import TransportUserItemStyles from '@/styles/TransportUserItemStyles';

interface TransportUserItemProps {
  item: AppointmentItemType;
  onTimePress: (id: number, time: string) => void;
}

const TransportUserItem: React.FC<TransportUserItemProps> = ({ item, onTimePress }) => {
  return (
    <View style={TransportUserItemStyles.item}>
      <View style={TransportUserItemStyles.infoContainer}>
        <Text style={TransportUserItemStyles.name}>{item.name}</Text>
        <View style={TransportUserItemStyles.timeContainer}>
          <Text style={TransportUserItemStyles.timeLabel}>送迎時間</Text>
          <TouchableOpacity onPress={() => onTimePress(item.id, item.time)}>
            <View style={TransportUserItemStyles.timeButton}>
              <Text style={TransportUserItemStyles.time}>{item.time}</Text>
              <Text style={TransportUserItemStyles.editText}>変更</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TransportUserItem;