import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { AuthState } from '../interfaces';
import { checkAuth } from './asyncThunks/checkAuth';
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

  reducers: {
    logOut: state => {
      localStorage.removeItem('ctpTokenCache');
      state.customer = null;
    },
  },
  extraReducers: builder => {
    //* register customer
    builder.addCase(registerUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.customer = action.payload;
      toast.success(`Welcome! ${action.payload.firstName}!`);
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
    //* silent login
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.customer = action.payload;
      console.log(action.payload);
      // toast.success(`Welcome back, ${action.payload.firstName}!`);
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'something go wrong';
    });
    builder.addCase(checkAuth.pending, state => {
      state.isLoading = true;
      state.error = null;
      state.customer = null;
    });
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
