// api/ecommerceApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';

import { dynamicBaseQuery } from './dynamicBaseQuery';

export const ecommerceApi = createApi({
  reducerPath: 'ecommerceApi',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['Customer', 'Products', 'Categories'],
  endpoints: builder => ({
    getProfile: builder.query({
      query: () => ({
        uri: `me`,
        method: 'GET',
        useAuthClient: true,
      }),
      providesTags: ['Customer'],
    }),

    updateProfile: builder.mutation({
      query: updateData => ({
        uri: `me`,
        method: 'POST',
        body: updateData,
        useAuthClient: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Customer'],
    }),
    updatePassword: builder.mutation({
      query: updateData => ({
        uri: `me/password`,
        method: 'POST',
        body: updateData,
        useAuthClient: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Customer'],
    }),

    getCategories: builder.query({
      query: () => ({
        uri: `categories`,
        method: 'GET',
        useAuthClient: false,
      }),
      providesTags: ['Categories'],
    }),

    getProducts: builder.query({
      query: productId => ({
        uri: `product-projections/${productId}`,
        method: 'GET',
        useAuthClient: false,
      }),
      providesTags: ['Products'],
    }),
  }),
});

export const {
  useUpdatePasswordMutation,
  useGetProfileQuery,
  useGetProductsQuery,
  useGetCategoriesQuery,
  useUpdateProfileMutation,
} = ecommerceApi;
