import { BaseQueryFn } from '@reduxjs/toolkit/query';

import {
  createAnonymousClient,
  createClientWithToken,
} from '../ecommerce/clientBuilder';
import { ApiError } from './interfaces';
import isCommerceToolsError from './isCommerceToolsError';
const projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY as string;

export const dynamicBaseQuery: BaseQueryFn<
  {
    uri: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: unknown;
    headers?: Record<string, string>;
    useAuthClient?: boolean; // Флаг для выбора клиента
  },
  unknown,
  ApiError
> = async args => {
  try {
    // Выбираем клиент в зависимости от флага
    const client = args.useAuthClient
      ? createClientWithToken()
      : createAnonymousClient();

    const fullUri = args.uri.startsWith('/')
      ? args.uri
      : `/${projectKey}${args.uri}`;

    const response = await client.execute({
      uri: fullUri,
      method: args.method,
      body: args.body as string,
      headers: args.headers,
    });

    return { data: response.body };
  } catch (error: unknown) {
    return handleCommerceToolsError(error);
  }
};

function handleCommerceToolsError(error: unknown): { error: ApiError } {
  if (isCommerceToolsError(error)) {
    return {
      error: {
        status: error.statusCode || error.body?.statusCode || 500,
        data: error.body?.message || error.message || 'CommerceTools error',
        errors: error.body?.errors,
      },
    };
  }

  if (error instanceof Error) {
    return {
      error: {
        status: 500,
        data: error.message,
      },
    };
  }

  return {
    error: {
      status: 500,
      data: 'Unknown error occurred',
    },
  };
}
