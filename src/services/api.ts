// api/ecommerceApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';

import { Cart } from '../pages/cart/clearCartObject';
import { IProductResponse } from '../pages/details/clearObject';
import { dynamicBaseQuery } from './dynamicBaseQuery';
import { ICategoryResponse } from './interfaces';
import {
  ELocalStorage,
  ICreateCartData,
} from './interfaces/createCart.interface';
import { IProductsResponse } from './interfaces/products.interfaces';
import { IUpdateCart } from './interfaces/updateCart.interface';

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
        useAuthClient: Boolean(localStorage.getItem(ELocalStorage.isAuth)),
      }),
      providesTags: ['Categories'],
    }),

    //? Product actions

    getProducts: builder.query<IProductsResponse, string>({
      query: (query: string) => ({
        uri: `product-projections${query}`,
        method: 'GET',
        useAuthClient: Boolean(localStorage.getItem(ELocalStorage.isAuth)),
      }),
      providesTags: ['Products'],
    }),

    getProduct: builder.query<IProductResponse, string>({
      query: id => ({
        uri: `products${id}`,
        method: 'GET',
        useAuthClient: Boolean(localStorage.getItem(ELocalStorage.isAuth)),
      }),
      providesTags: ['Product'],
    }),
    //! cart actions

    createCart: builder.mutation<Cart, ICreateCartData>({
      query: ({ currency = 'BYN', anonymousId, customerId }) => ({
        uri: `me/carts`,
        method: 'POST',
        useAuthClient: Boolean(localStorage.getItem(ELocalStorage.isAuth)),
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

    mergeCart: builder.mutation<
      Cart,
      { customerId: string; anonymousCartId: string; currency?: 'BYN' }
    >({
      query: ({ customerId, anonymousCartId, currency = 'BYN' }) => ({
        uri: `me/carts`,
        method: 'POST',
        useAuthClient: Boolean(localStorage.getItem(ELocalStorage.isAuth)),
        headers: {
          'Content-Type': 'application/json',
        },
        body: { customerId, anonymousCartId, currency },
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
        useAuthClient: Boolean(localStorage.getItem(ELocalStorage.isAuth)),
        headers: {
          'Content-Type': 'application/json',
        },
        body: actionBody,
      }),
      invalidatesTags: ['Cart'],
    }),

    deleteCart: builder.mutation<Cart, { cartId: string; cartVersion: number }>(
      {
        query: ({ cartId, cartVersion }) => ({
          uri: `me/carts/${cartId}?version=${cartVersion}`,
          method: 'DELETE',
          useAuthClient: Boolean(localStorage.getItem(ELocalStorage.isAuth)),
          headers: {
            'Content-Type': 'application/json',
          },
        }),
        invalidatesTags: ['Cart'],
      },
    ),

    getActiveCart: builder.query<Cart, unknown>({
      query: () => ({
        uri: `me/active-cart`,
        method: 'GET',
        useAuthClient: Boolean(localStorage.getItem(ELocalStorage.isAuth)),
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
  useDeleteCartMutation,
  useMergeCartMutation,
} = ecommerceApi;
export default ecommerceApi;
