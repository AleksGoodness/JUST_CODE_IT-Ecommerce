import { createAsyncThunk } from '@reduxjs/toolkit';
const projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY as string;

import { loginCustomerClient } from '../../../ecommerce/clientBuilder';
import { ICustomerDetails } from '../../../interfaces';
import { ELocalStorage } from '../../../services/interfaces/createCart.interface';

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface ILoginResponse {
  body?: ICustomerDetails;
}

const loginCustomer = createAsyncThunk(
  'auth/login',
  async (credentials: ILoginCredentials) => {
    try {
      localStorage.removeItem(ELocalStorage.ctpToken);
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
      } else throw new Error('login failed:');
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
);

export default loginCustomer;
