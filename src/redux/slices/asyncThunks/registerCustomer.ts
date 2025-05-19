import { createAsyncThunk } from '@reduxjs/toolkit';
const projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY;

import { createRegistrationClient } from '../../../ecommerce/clientBuilder';
import { ICustomer, IRegisterData } from '../../interfaces';

interface RegistrationResponse {
  body?: { customer: ICustomer };
}

const registerCustomer = createAsyncThunk(
  'auth/register',
  async (customer: IRegisterData) => {
    try {
      const client = createRegistrationClient();

      const response: RegistrationResponse = await client.execute({
        method: 'POST',
        uri: `/${projectKey}/customers`,
        body: customer,
      });

      if (response.body) {
        return response.body.customer;
      }
      throw new Error('Registration failed:');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
);

export default registerCustomer;
