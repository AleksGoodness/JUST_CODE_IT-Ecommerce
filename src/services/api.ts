// api/ecommerceApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';

import { dynamicBaseQuery } from './dynamicBaseQuery';
import { ICategoryResponse } from './interfaces';

export const ecommerceApi = createApi({
  reducerPath: 'ecommerceApi',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['Customer', 'Products', 'Product', 'Categories'],
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

    getCategories: builder.query<ICategoryResponse, unknown>({
      query: () => ({
        uri: `categories`,
        method: 'GET',
        useAuthClient: false,
      }),
      providesTags: ['Categories'],
    }),

    getProducts: builder.query({
      query: (query: string) => ({
        uri: `product-projections${query}`,
        method: 'GET',
        useAuthClient: false,
      }),
      providesTags: ['Products'],
    }),

    getProduct: builder.query({
      query: query => ({
        uri: `products${query}`,
        method: 'GET',
        useAuthClient: false,
      }),
      providesTags: ['Product'],
    }),

    createCart: builder.query({
      query: () => ({
        uri: `carts`,
        method: 'POST',
        useAuthClient: false,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          currency: 'BYN',
        },
      }),
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useCreateCartQuery,
} = ecommerceApi;
