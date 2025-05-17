import { createAsyncThunk } from '@reduxjs/toolkit';

import { loginUser } from '../../../ecommerce/commerceToolsClient';

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}

const loginCustomer = createAsyncThunk(
  'users/login',
  async (data: ILoginCredentials) => {
    console.log(data);
    const response: IResponse = await loginUser(data.email, data.password);
    console.log(response);
    return response;
  },
);

export default loginCustomer;
