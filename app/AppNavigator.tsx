// app/AppNavigator.tsx
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

const AppNavigator: React.FC = () => {
  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      // ローディングが終わったら認証状態に応じて画面を切り替え
      if (isAuthenticated) {
        router.replace('/userlist');
      } else {
        router.replace('/login');
      }
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    // 認証状態のロード中
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#447FFF" />
      </View>
    );
  }

  // ここでは何も表示せず、useEffectのルーター処理に任せる
  return null;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f6ff',
  },
});

export default AppNavigator;