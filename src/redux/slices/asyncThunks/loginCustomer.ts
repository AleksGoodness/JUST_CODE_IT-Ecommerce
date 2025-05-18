import { createAsyncThunk } from '@reduxjs/toolkit';

import { loginUser } from '../../../ecommerce/commerceToolsClient';
import { ICustomer } from '../../interfaces';

export interface ILoginCredentials {
  email: string;
  password: string;
}

const loginCustomer = createAsyncThunk(
  'auth/login',
  async (credentials: ILoginCredentials) => {
    const response: ICustomer = await loginUser(
      credentials.email,
      credentials.password,
    );

    return response;
  },
);

export default loginCustomer;
