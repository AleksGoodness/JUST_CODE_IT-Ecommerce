// api/ecommerceApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';

import { Cart } from '../pages/cart/clearCartObject';
import { IProductResponse } from '../pages/details/clearObject';
import { ICreateCartData } from './createCart.interface';
import { dynamicBaseQuery } from './dynamicBaseQuery';
import { ICategoryResponse } from './interfaces';
import { IUpdateCart } from './updateCart.interface';

export const ecommerceApi = createApi({
  reducerPath: 'ecommerceApi',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['Customer', 'Products', 'Product', 'Categories', 'Cart'],
  endpoints: builder => ({
    // profile actions

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

    //* categories actions

    getCategories: builder.query<ICategoryResponse, unknown>({
      query: () => ({
        uri: `categories`,
        method: 'GET',
        useAuthClient: false,
      }),
      providesTags: ['Categories'],
    }),

    //? Product actions

    getProducts: builder.query({
      query: (query: string) => ({
        uri: `product-projections${query}`,
        method: 'GET',
        useAuthClient: false,
      }),
      providesTags: ['Products'],
    }),

    getProduct: builder.query<IProductResponse, string>({
      query: id => ({
        uri: `products${id}`,
        method: 'GET',
        useAuthClient: false,
      }),
      providesTags: ['Product'],
    }),
    //! cart actions

    createCart: builder.mutation<Cart, ICreateCartData>({
      query: ({
        currency = 'BYN',
        anonymousId,
        customerId,
        useAuthClient,
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

    updateCart: builder.mutation<
      Cart,
      { cartId: string; actionBody: IUpdateCart }
    >({
      query: ({ cartId, actionBody }) => ({
        uri: `me/carts/${cartId}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: actionBody,
      }),
      invalidatesTags: ['Cart'],
    }),

    getActiveCart: builder.query<Cart, unknown>({
      query: () => ({
        uri: `me/active-cart`,
        method: 'GET',
        useAuthClient: false,
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
  useGetActiveCartQuery,
  useUpdateCartMutation,
} = ecommerceApi;
