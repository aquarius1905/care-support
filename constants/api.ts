export const BASE_URL = 'http://192.168.1.2:8000/api';

export const ENDPOINTS = {
  TOKEN: '/token/',
  TOKEN_REFRESH: '/token/refresh/',
  TRANSPORT_SCHEDULES: '/transport-schedules/',
  getTransportSchedulesByDate: (date: string) => `/transport-schedules/?date=${date}`,
  getTransportScheduleById: (id: number) => `/transport-schedules/${id}/`,
};

export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';