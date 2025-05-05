export interface TransportUser {
  id: number;
  name: string;
  time: string;
}

export interface TransportScheduleAPI {
  id: number;
  user_name: string;
  scheduled_transport_datetime: string;
  actual_transport_datetime: string | null;
}

export interface TransportTimeUpdateRequest {
  time: string;
}

export interface ApiError {
  status: number;
  message: string;
  details?: Record<string, any>;
}

export interface ApiResponse<T> {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results: T[];
}

export interface AuthTokens {
  access: string;
  refresh: string;
}