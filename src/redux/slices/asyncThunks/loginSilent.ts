import { createAsyncThunk } from '@reduxjs/toolkit';

import { createClientWithToken } from '../../../ecommerce/clientBuilder';
import { ICustomerDetails } from '../../../interfaces';
import { ILoginResponse } from './loginCustomer';

const projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY as string;

const loginSilent = createAsyncThunk(
  'auth/silentLogin',
  async (): Promise<ICustomerDetails> => {
    const client = createClientWithToken();

    try {
      const response: ILoginResponse = await client.execute({
        uri: `/${projectKey}/me`,
        method: 'GET',
      });
      if (response.body) {
        return response.body;
      }
      throw new Error('login failed:');
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('login failed');
      }
      throw new Error('login failed: unknown error');
    }
  },
);

export default loginSilent;
