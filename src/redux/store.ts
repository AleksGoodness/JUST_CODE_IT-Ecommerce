import { configureStore } from '@reduxjs/toolkit';

import { ecommerceApi } from '../services/api.ts';
import authSlice from './slices/authSlice.ts';
import themeSlice from './slices/themeSlice.ts';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    [ecommerceApi.reducerPath]: ecommerceApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(ecommerceApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
