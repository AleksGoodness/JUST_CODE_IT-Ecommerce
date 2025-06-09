import { BaseQueryFn } from '@reduxjs/toolkit/query';

import {
  createAnonymousClient,
  createClientWithToken,
} from '../ecommerce/clientBuilder';
import {
  CustomApiError,
  getCommerceToolsError,
  isCommerceToolsError,
} from './isCommerceToolsError';
const projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY as string;

interface ISettings {
  uri: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: Record<string, string>;
  useAuthClient?: boolean;
}

export const dynamicBaseQuery: BaseQueryFn<
  ISettings,
  unknown,
  CustomApiError,
  object
> = async args => {
  try {
    const client = args.useAuthClient
      ? createClientWithToken()
      : createAnonymousClient();

    console.log(client);
    const fullUri = args.uri.startsWith('/')
      ? args.uri
      : `/${projectKey}/${args.uri}`;

    const response = await client.execute({
      uri: fullUri,
      method: args.method,
      body: args.body as string,
      headers: args.headers,
    });

    return { data: response.body };
  } catch (error: unknown) {
    if (isCommerceToolsError(error)) {
      const ctError = getCommerceToolsError(error);
      return {
        error: {
          status: ctError.statusCode,
          data: {
            message: ctError.message,
            errors: ctError.errors?.map(err => ({
              code: err.code,
              message: err.message,
              field: err.field,
            })),
          },
        },
      };
    }
    return {
      error: {
        status: 500,
        data: {
          message: 'Unknown error',
        },
      },
    };
  }
};
