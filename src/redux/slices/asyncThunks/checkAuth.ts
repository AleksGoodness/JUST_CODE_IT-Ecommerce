import { createAsyncThunk } from '@reduxjs/toolkit';

import { checkAuthClient, tokenCache } from '../../../ecommerce/clientBuilder';

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const client = checkAuthClient();
      const response = await client.execute({
        uri: '/oauth/introspect',
        method: 'POST',
      });

      console.log(response);
      return { customer: response.body };
    } catch (error) {
      tokenCache.set({ token: '', expirationTime: 0 });
      return rejectWithValue(error);
    }
  },
);
