import api, { ApiError } from '@/utils/api';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import LoginStyles from '@/styles/LoginStyles';
import showToast from '@/utils/showToast';
import { router } from 'expo-router';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    // 入力検証
    if (!email.trim() || !password.trim()) {
      setErrorMessage('メールアドレスとパスワードを入力してください')
      return;
    }
    
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const authTokens = await api.login(email, password);
      
      // トークンをAuthContextを通じて保存
      await login(authTokens.access, authTokens.refresh);
      
      // 利用者一覧画面に遷移
      router.replace('/userlist');
    } catch (error) {
      // エラーはApiErrorでラップされているので、専用のエラーハンドリング
      if (error instanceof ApiError) {
        setErrorMessage(error.message)
      } else {
        console.error(error);
        showToast('通信エラーが発生しました', false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={LoginStyles.container}>
      <Header title="ログイン" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={LoginStyles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={LoginStyles.innerContainer}>
            <View style={LoginStyles.formContainer}>
              <Text style={LoginStyles.label}>メールアドレス</Text>
              <TextInput
                style={LoginStyles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="メールアドレスを入力"
                autoCapitalize="none"
                autoCorrect={false}
              />
              
              <Text style={LoginStyles.label}>パスワード</Text>
              <TextInput
                style={LoginStyles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="パスワードを入力"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
              
              {errorMessage && (
                <Text style={LoginStyles.errorMessage}>{errorMessage}</Text>
              )}
              
              <TouchableOpacity 
                style={LoginStyles.loginButton}
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={LoginStyles.loginButtonText}>ログイン</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;