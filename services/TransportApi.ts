import { ApiResponse, TransportScheduleAPI, TransportUser } from '@/types';

import { ENDPOINTS } from '@/constants/api';
import api from '@/utils/api';
import dayjs from 'dayjs';

// API結果をビジネスロジック用のデータモデルに変換
const mapToTransportUser = (apiData: TransportScheduleAPI): TransportUser => ({
  id: apiData.id,
  name: apiData.user_name,
  time: new Date(apiData.actual_transport_datetime || apiData.scheduled_transport_datetime)
    .toLocaleTimeString('ja-JP', {hour: '2-digit', minute: '2-digit'})
});

// 本日の送迎スケジュールを取得
const getTodayTransportSchedules = async (): Promise<TransportUser[]> => {
  const today = dayjs().format('YYYY-MM-DD');
  const response = await api.get<ApiResponse<TransportScheduleAPI>>(
    ENDPOINTS.getTransportSchedulesByDate(today)
  );
  
  return response.results.map(mapToTransportUser);
};

// 特定日の送迎スケジュールを取得
const getTransportSchedulesByDate = async (date: string): Promise<TransportUser[]> => {
  const response = await api.get<ApiResponse<TransportScheduleAPI>>(
    ENDPOINTS.getTransportSchedulesByDate(date)
  );
  
  return response.results.map(mapToTransportUser);
};

// 送迎時間を更新
const updateTransportTime = async (id: number, time: string): Promise<TransportUser> => {
  const response = await api.patch<TransportScheduleAPI>(
    ENDPOINTS.getTransportScheduleById(id),
    { time }
  );
  
  return mapToTransportUser(response);
};

const TransportApi = {
  getTodayTransportSchedules,
  getTransportSchedulesByDate,
  updateTransportTime
};

export default TransportApi;