import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { router } from 'expo-router';
import Toast from 'react-native-root-toast';
import Header from '@/components/Header';
import { API_URL } from '@/constants/constants';
import { useAuth } from '@/contexts/AuthContext';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth(); // 認証コンテキストを使用

  // トースト表示用のヘルパー関数
  const showToast = (message: string, isSuccess: boolean = true) => {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: isSuccess ? '#4CAF50' : '#F44336', // 成功は緑、失敗は赤
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      containerStyle: {
        padding: 15,
        borderRadius: 10,
      },
    });
  };

  const handleLogin = async () => {
    // 入力検証
    if (!username.trim() || !password.trim()) {
      showToast('ユーザー名とパスワードを入力してください', false);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await fetch(`${API_URL}/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        }),
      });
      
      const data = await result.json();
      
      if (result.ok) {
        // トークンをAuthContextを通じて保存
        await login(data.access); // JWTトークンの保存（APIのレスポンス形式に合わせて調整）
        showToast('ログインに成功しました', true);
        // 利用者画面に遷移
        router.replace('/userlist');
      } else {
        // エラーメッセージを表示
        showToast(data.detail || 'ログインに失敗しました', false);
      }
    } catch (error) {
      console.error(error);
      showToast('通信エラーが発生しました', false);
    } finally {
      setIsLoading(false);
    }
  };

  // 残りのコードは変更なし...

  return (
    <SafeAreaView style={styles.container}>
      {/* 既存のコード */}
      <Header title="ログイン" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <View style={styles.formContainer}>
              <Text style={styles.label}>ユーザー名</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="ユーザー名を入力"
                autoCapitalize="none"
                autoCorrect={false}
              />
              
              <Text style={styles.label}>パスワード</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="パスワードを入力"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
              
              <TouchableOpacity 
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginButtonText}>ログイン</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f6ff',
    paddingTop: StatusBar.currentHeight || 0,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#447FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: '#447FFF',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f0f5ff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  loginButton: {
    backgroundColor: '#447FFF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default LoginScreen;