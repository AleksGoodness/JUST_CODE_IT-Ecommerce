import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState, Customer } from '../interfaces';

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
  // extraReducers(builder) {
  //   builder.addCase();
  // },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
