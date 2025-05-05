import { ApiError } from './api';
import showToast from './showToast';

export const handleApiError = (error: unknown, defaultMessage = 'エラーが発生しました'): string => {
  if (error instanceof ApiError) {
    // ステータスコードに基づいたエラーメッセージのカスタマイズ
    switch (error.status) {
      case 400:
        return '入力内容に問題があります';
      case 401:
        return '認証エラー: 再度ログインしてください';
      case 403:
        return 'アクセス権限がありません';
      case 404:
        return '要求されたリソースが見つかりません';
      case 500:
        return 'サーバーエラーが発生しました';
      default:
        return error.message || defaultMessage;
    }
  }
  
  return error instanceof Error ? error.message : defaultMessage;
};

export const showApiError = (error: unknown, defaultMessage = 'エラーが発生しました'): void => {
  const message = handleApiError(error, defaultMessage);
  showToast(message, false);
};