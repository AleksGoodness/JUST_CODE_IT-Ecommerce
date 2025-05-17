import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState, Customer } from '../interfaces';
import registerUser from './asyncThunks/asyncThunks';

const initialState: AuthState = {
  customer: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<Customer>) {
      state.customer = action.payload;
      state.isLoading = false;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout(state) {
      state.customer = null;
    },
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.customer = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'something go wrong';
    });
    builder.addCase(registerUser.pending, state => {
      state.isLoading = true;
    });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
