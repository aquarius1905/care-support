import { useEffect, useState } from 'react';

import { ApiError } from '@/utils/api';
import TransportApi from '@/services/TransportApi';
import { TransportUser } from '@/types';
import { handleApiError } from '@/utils/errorHandling';
import { useAuth } from '@/contexts/AuthContext';

export const useTransportUsers = () => {
  const [transportUsers, setTransportUsers] = useState<TransportUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // 本日の送迎ユーザーを取得
  const fetchTodayTransportUsers = async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const users = await TransportApi.getTodayTransportSchedules();
      setTransportUsers(users);
    } catch (error) {
      setError(handleApiError(error, 'データの取得に失敗しました'));
    } finally {
      setIsLoading(false);
    }
  };

  // 特定の日付の送迎ユーザーを取得
  const fetchTransportUsersByDate = async (date: string) => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const users = await TransportApi.getTransportSchedulesByDate(date);
      setTransportUsers(users);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        setError('認証エラー：再度ログインしてください');
      } else {
        setError('データの取得に失敗しました');
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 送迎時間を更新
  const updateTransportTime = async (id: number, newTime: string): Promise<boolean> => {
    try {
      const updatedUser = await TransportApi.updateTransportTime(id, newTime);
      
      // 成功したら画面のデータを更新
      setTransportUsers(prev =>
        prev.map(user => user.id === id ? updatedUser : user)
      );
      
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // 初回マウント時にデータ取得
  useEffect(() => {
    if (isAuthenticated) {
      fetchTodayTransportUsers();
    }
  }, [isAuthenticated]);

  return {
    transportUsers,
    isLoading,
    error,
    updateTransportTime,
    refreshTransportUsers: fetchTodayTransportUsers,
    fetchTransportUsersByDate,
  };
};