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
    useAuthClient?: boolean;
  },
  unknown,
  ApiError
> = async <T, R>(args: {
  uri: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: T;
  headers?: Record<string, string>;
  useAuthClient?: boolean;
}) => {
  try {
    const client = args.useAuthClient
      ? createClientWithToken()
      : createAnonymousClient();

    const fullUri = args.uri.startsWith('/')
      ? args.uri
      : `/${projectKey}/${args.uri}`;

    const response = await client.execute({
      uri: fullUri,
      method: args.method,
      body: args.body as string,
      headers: args.headers,
    });

    return { data: response.body as R };
  } catch (error: unknown) {
    if (isCommerceToolsError(error)) {
      return {
        error: {
          status: error.statusCode || 500,
          data: error.body?.message || error.message || 'API Error',
        },
      };
    }

    return {
      error: {
        status: 500,
        data: (error as Error)?.message || 'Unknown error',
      },
    };
  }
};
