import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { AuthState } from '../interfaces';
import loginCustomer from './asyncThunks/loginCustomer';
import registerUser from './asyncThunks/registerCustomer';

const initialState: AuthState = {
  customer: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {},
  extraReducers: builder => {
    //* register customer
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.customer = action.payload;
      toast.success(`Welcome back, ${action.payload.firstName}!`);
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'something go wrong';
      toast.error(`Login failed! ${action.error.message ?? ''}`);
    });
    builder.addCase(registerUser.pending, state => {
      state.isLoading = true;
      state.error = null;
      state.customer = null;
    });
    //* login customer
    builder.addCase(loginCustomer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.customer = action.payload;
      toast.success(`Welcome back, ${action.payload.firstName}!`);
    });
    builder.addCase(loginCustomer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'something go wrong';
      toast.error(`Login failed! ${action.error.message ?? ''}`);
    });
    builder.addCase(loginCustomer.pending, state => {
      state.isLoading = true;
      state.error = null;
      state.customer = null;
    });
  },
});

//!
export default authSlice.reducer;
