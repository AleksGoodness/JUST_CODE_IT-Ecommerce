import { createAsyncThunk } from '@reduxjs/toolkit';
const projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY as string;

import {
  createRegistrationClient,
  loginCustomerClient,
} from '@/ecommerce/clientBuilder';
import { IRegisterData } from '@/redux/interfaces';
import { ELocalStorage } from '@/services/interfaces/createCart.interface';

import { ILoginResponse } from './loginCustomer';

const registerCustomer = createAsyncThunk(
  'auth/register',
  async (customer: IRegisterData) => {
    try {
      const client = createRegistrationClient();

      const response = await client.execute({
        method: 'POST',
        uri: `/${projectKey}/customers`,
        body: customer,
      });
      if (response.statusCode === 201) {
        const autoLogin = async () => {
          try {
            localStorage.removeItem(ELocalStorage.ctpToken);
            const client = loginCustomerClient(
              customer.email,
              customer.password,
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
        };

        const autoLoginResponse = await autoLogin();

        return autoLoginResponse;
      }

      throw new Error('Registration failed:');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
);

export default registerCustomer;
