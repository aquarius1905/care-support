import { AuthProvider } from '@/contexts/AuthContext';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <RootSiblingParent>
      <AuthProvider>
        <Stack />
        <Stack.Screen options={{ headerShown: false }} />
      </AuthProvider>
    </RootSiblingParent>
  );
}