import { BaseQueryFn } from '@reduxjs/toolkit/query';

import { createClientWithToken } from '../ecommerce/clientBuilder';
import { ApiError, IApiArgs } from './interfaces';
import isCommerceToolsError from './isCommerceToolsError';
const projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY as string;

export const ecommerceBaseQuery: BaseQueryFn<
  IApiArgs,
  unknown,
  ApiError
> = async args => {
  try {
    const client = createClientWithToken();

    // Добавляем базовый URL, если нужно
    const fullUri = args.uri.startsWith('/')
      ? args.uri
      : `/${projectKey}${args.uri}`;

    const response = await client.execute({
      uri: fullUri,
      method: args.method,
      body: args.body,
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
