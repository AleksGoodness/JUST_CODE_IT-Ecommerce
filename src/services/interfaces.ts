export interface CommerceToolsError extends Error {
  statusCode?: number;
  body?: {
    statusCode?: number;
    message?: string;
    errors?: {
      code: string;
      message: string;
    }[];
  };
}
export interface ApiError {
  status: number;
  data: string;
  errors?: {
    code: string;
    message: string;
  }[];
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}
export interface IApiArgs<T = unknown> {
  uri: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: T;
  headers?: Record<string, string>;
  queryParams?: Record<string, string | number | boolean>;
}
