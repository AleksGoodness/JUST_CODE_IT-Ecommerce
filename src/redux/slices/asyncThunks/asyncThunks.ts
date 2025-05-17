import { createAsyncThunk } from '@reduxjs/toolkit';

import { signUpCustomer } from '../../../ecommerce/commerceToolsClient';
import { RegisterInputProps } from '../../../pages/register/interfaces';

export interface ICustomer {
  addresses: string[];
  email: string;
  firstName: string;
  id: string;
  isEmailVerified: boolean;
  lastName: string;
  password: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  authenticationMode: string;
  stores: string[];
}

const registerUser = createAsyncThunk(
  'users/register',
  async (data: RegisterInputProps) => {
    const testData = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    };
    const response: ICustomer = await signUpCustomer(testData);
    return response;
  },
);

export default registerUser;
