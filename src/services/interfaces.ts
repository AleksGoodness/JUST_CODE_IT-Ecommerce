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
  originalError: {
    errors?: {
      code: string;
      message: string;
      field: string;
    }[];
  };
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}
export interface IApiArgs {
  uri: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: Record<string, string>;
  queryParams?: Record<string, string | number | boolean>;
}
