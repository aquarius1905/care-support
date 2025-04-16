// utils/api.ts
import { API_URL } from '@/constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = 'auth_token';

// ログインAPI（認証前）
export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password
    }),
  });
  
  // レスポンスを返す
  return response;
};

// 認証済みのAPIリクエストを送信する関数
export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  // トークンを取得
  const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!token) {
    throw new Error('認証されていません');
  }
  
  // ヘッダーに認証トークンを追加
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // APIリクエストを送信
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
  
  // 401エラーの場合はトークンを削除
  if (response.status === 401) {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    throw new Error('認証エラー');
  }
  
  // レスポンスを返す
  return response;
};

// GETリクエスト
export const get = async (endpoint: string) => {
  const response = await fetchWithAuth(endpoint);
  return response.json();
};

// POSTリクエスト
export const post = async (endpoint: string, data: any) => {
  const response = await fetchWithAuth(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.json();
};

// PATCHリクエスト
export const patch = async (endpoint: string, data: any) => {
  const response = await fetchWithAuth(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
  return response.json();
};

// DELETEリクエスト
export const del = async (endpoint: string) => {
  const response = await fetchWithAuth(endpoint, {
    method: 'DELETE',
  });
  return response.status === 204 ? null : response.json();
};