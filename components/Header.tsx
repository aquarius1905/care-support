import { Text, TouchableOpacity, View } from 'react-native';

import { Feather } from '@expo/vector-icons';
import HeaderStyles from '@/styles/HeaderStyles';
import React from 'react';

interface HeaderProps {
  title: string;
  showLogout?: boolean;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showLogout = false, onLogout }) => {
  return (
    <View style={HeaderStyles.header}>
      <Text style={HeaderStyles.title}>{title}</Text>
      {showLogout && onLogout && (
        <TouchableOpacity
          style={HeaderStyles.logoutButton}
          onPress={onLogout}
        >
          <Feather name="log-out" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
