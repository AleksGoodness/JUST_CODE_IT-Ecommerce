// api/ecommerceApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';

import { dynamicBaseQuery } from './profile';
const projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY as string;

export const ecommerceApi = createApi({
  reducerPath: 'ecommerceApi',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['Customer', 'Products', 'Categories'],
  endpoints: builder => ({
    getProfile: builder.query({
      query: () => ({
        uri: `/${projectKey}/me`,
        method: 'GET',
        useAuthClient: true,
      }),
      providesTags: ['Customer'],
    }),

    updateProfile: builder.mutation({
      query: updateData => ({
        uri: `/${projectKey}/me`,
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
        uri: `/${projectKey}/categories`,
        method: 'GET',
        useAuthClient: false,
      }),
      providesTags: ['Categories'],
    }),

    getProducts: builder.query({
      query: productId => ({
        uri: `/${projectKey}/product-projections/${productId}`,
        method: 'GET',
        useAuthClient: false,
      }),
      providesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetProductsQuery,
  useGetCategoriesQuery,
  useUpdateProfileMutation,
} = ecommerceApi;
