import { ActivityIndicator, View } from 'react-native';

import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    // 認証状態を読み込み中
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 認証済み → ユーザーリスト画面へ
  if (isAuthenticated) {
    console.log("認証済み - ユーザーリスト画面へ遷移");
    return <Redirect href="/userlist" />;
  }

  // 未認証 → ログイン画面へ
  console.log("未認証 - ログイン画面へ遷移");
  return <Redirect href="/login" />;
}