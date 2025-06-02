import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice.ts';
import themeSlice from './slices/themeSlice.ts';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
