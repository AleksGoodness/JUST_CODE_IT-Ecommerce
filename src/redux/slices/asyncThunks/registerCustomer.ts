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

const registerCustomer = createAsyncThunk(
  'users/register',
  async (data: RegisterInputProps) => {
    const response: ICustomer = await signUpCustomer(data);
    return response;
  },
);

export default registerCustomer;
