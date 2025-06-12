// api/ecommerceApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';

import { Cart } from '../pages/cart/clearCartObject';
import { dynamicBaseQuery } from './dynamicBaseQuery';
import { ICategoryResponse } from './interfaces';

export const ecommerceApi = createApi({
  reducerPath: 'ecommerceApi',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['Customer', 'Products', 'Product', 'Categories', 'Cart'],
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

    createCart: builder.mutation<Cart, unknown>({
      query: ({
        currency = 'BYN',
        anonymousId,
        customerId,
        useAuthClient,
      }: {
        currency: 'BYN' | 'RUB';
        anonymousId?: string;
        customerId?: string;
        useAuthClient: boolean;
      }) => ({
        uri: `me/carts`,
        method: 'POST',
        useAuthClient: useAuthClient,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          currency,
          customerId,
          anonymousId,
        },
      }),
      invalidatesTags: ['Cart'],
    }),
    getCart: builder.query<Cart, unknown>({
      query: ({
        cartId,
        useAuthClient,
      }: {
        cartId: string;
        useAuthClient: boolean;
      }) => ({
        uri: `me/carts/${cartId}`,
        method: 'GET',
        useAuthClient: useAuthClient,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Cart'],
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
  useCreateCartMutation,
  useGetCartQuery,
} = ecommerceApi;
