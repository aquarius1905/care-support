// utils/api.ts
import * as SecureStore from 'expo-secure-store';

import { ACCESS_TOKEN_KEY, BASE_URL, ENDPOINTS, REFRESH_TOKEN_KEY } from '@/constants/api';

import { AuthTokens } from '@/types';
import { router } from 'expo-router';
import showToast from './showToast';

class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// ログインAPI（認証前）
const login = async (email: string, password: string): Promise<AuthTokens> => {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINTS.TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.detail || '認証に失敗しました';
      throw new ApiError(errorMessage, response.status);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('通信エラーが発生しました');
  }
};

// トークン管理
const getToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
};

const getRefreshToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
};

// 認証済みのAPIリクエストを送信する関数
const fetchWithAuth = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  let token = await getToken();

  if (!token) {
    throw new ApiError('認証エラー', 401);
  }

  const makeRequest = async (accessToken: string): Promise<Response> => {
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    return fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
  };

  let response = await makeRequest(token);

  // アクセストークンの期限切れ（401）が返ってきた場合はリフレッシュを試みる
  if (response.status === 401) {
    try {
      const newAccessToken = await refreshAccessToken(); // 新しいaccess_token取得＆保存
      response = await makeRequest(newAccessToken); // 再リクエスト
    } catch {
      // リフレッシュも失敗したらトークンを削除してログアウト扱いに
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
      router.replace('/login');
      showToast('セッションの有効期限が切れました。再度ログインしてください。', false);
      throw new ApiError('再ログインが必要です', 401);
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.detail || `APIエラー: ${response.status}`, 
      response.status
    );
  }

  if (response.status === 204) {
    return {} as T;
  }

  return await response.json();
};

const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);

  if (!refreshToken) {
    throw new Error('リフレッシュトークンが存在しません');
  }

  const response = await fetch(`${BASE_URL}${ENDPOINTS.TOKEN_REFRESH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) {
    console.log('トークンのリフレッシュに失敗しました')
    throw new Error('トークンのリフレッシュに失敗しました');
  }

  const data = await response.json();

  // 新しいアクセストークンを保存
  console.log('新しいアクセストークンを保存しました')
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, data.access);

  return data.access;
};


// 基本的なCRUD操作
const get = async <T>(endpoint: string): Promise<T> => {
  return await fetchWithAuth<T>(endpoint);
};

const post = async <T>(endpoint: string, data: any): Promise<T> => {
  return await fetchWithAuth<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

const patch = async <T>(endpoint: string, data: any): Promise<T> => {
  return await fetchWithAuth<T>(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

const del = async <T>(endpoint: string): Promise<T> => {
  return await fetchWithAuth<T>(endpoint, {
    method: 'DELETE',
  });
};

const api = {
  login,
  getToken,
  getRefreshToken,
  get,
  post,
  patch,
  del,
};

export default api;
export { ApiError };
