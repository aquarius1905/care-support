import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// または import * as SecureStore from 'expo-secure-store';

// 認証情報の型定義
type AuthContextType = {
  authToken: string | null;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
};

// 認証コンテキストの作成
const AuthContext = createContext<AuthContextType>({
  authToken: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  isAuthenticated: false,
});

// ストレージのキー
const AUTH_TOKEN_KEY = 'auth_token';

// 認証プロバイダーコンポーネント
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // アプリ起動時に保存されたトークンを取得
  useEffect(() => {
    const loadToken = async () => {
      try {
        // AsyncStorageからトークンを取得
        const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
        // トークンがあれば状態を更新
        if (token) {
          setAuthToken(token);
        }
      } catch (error) {
        console.error('トークンの取得に失敗しました:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  }, []);

  // ログイン処理 - トークンを保存
  const login = async (token: string) => {
    try {
      // AsyncStorageにトークンを保存
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
      setAuthToken(token);
    } catch (error) {
      console.error('トークンの保存に失敗しました:', error);
      throw error;
    }
  };

  // ログアウト処理 - トークンを削除
  const logout = async () => {
    try {
      // AsyncStorageからトークンを削除
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      setAuthToken(null);
    } catch (error) {
      console.error('ログアウトに失敗しました:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        isLoading,
        login,
        logout,
        isAuthenticated: !!authToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// カスタムフック
export const useAuth = () => useContext(AuthContext);