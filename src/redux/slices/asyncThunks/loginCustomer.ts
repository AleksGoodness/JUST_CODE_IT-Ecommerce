import { createAsyncThunk } from '@reduxjs/toolkit';
const projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY;

import { loginCustomerClient } from '../../../ecommerce/clientBuilder';
import { ICustomer } from '../../interfaces';

export interface ILoginCredentials {
  email: string;
  password: string;
}

interface ILoginResponse {
  body?: ICustomer;
}

const loginCustomer = createAsyncThunk(
  'auth/login',
  async (credentials: ILoginCredentials) => {
    try {
      const client = loginCustomerClient(
        credentials.email,
        credentials.password,
      );

      const response: ILoginResponse = await client.execute({
        uri: `/${projectKey}/me`,
        method: 'GET',
      });
      if (response.body) {
        return response.body;
      }
      throw new Error('login failed:');
    } catch (error) {
      console.error('login failed:', error);
      throw error;
    }
  },
);

export default loginCustomer;
