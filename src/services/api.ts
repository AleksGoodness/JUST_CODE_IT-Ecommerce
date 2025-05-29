// api/ecommerceApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';

import { CustomerUpdateData, ICustomerDetails } from '../interfaces';
import { ecommerceBaseQuery } from './profile';
const projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY as string;

export const ecommerceApi = createApi({
  reducerPath: 'ecommerceApi',
  baseQuery: ecommerceBaseQuery,
  tagTypes: ['Customer'],
  endpoints: builder => ({
    getProfileWithToken: builder.query({
      query: () => ({
        uri: `/${projectKey}/me`,
        method: 'GET',
      }),
      providesTags: result => [{ type: 'Customer', id: result?.id }],
    }),

    updateProfile: builder.mutation<ICustomerDetails, CustomerUpdateData>({
      query: updateData => ({
        uri: `/${projectKey}/me`,
        method: 'POST',
        body: updateData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: result => [{ type: 'Customer', id: result?.id }],
    }),

    // Пример эндпоинта для получения продукта
    getProduct: builder.query({
      query: (productId: string) => ({
        uri: `/products/${productId}`,
        method: 'GET',
      }),
    }),
  }),
});

// Экспортируем автоматически генерируемые хуки
export const {
  useGetProductQuery,
  useGetProfileWithTokenQuery,
  useUpdateProfileMutation,
} = ecommerceApi;
