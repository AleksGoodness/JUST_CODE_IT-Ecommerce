import { createAsyncThunk } from '@reduxjs/toolkit';

import { signUpCustomer } from '../../../ecommerce/commerceToolsClient';
import { ICustomer, IRegisterData } from '../../interfaces';

const registerCustomer = createAsyncThunk(
  'auth/register',
  async (credentials: IRegisterData) => {
    const response: ICustomer = await signUpCustomer(credentials);
    return response;
  },
);

export default registerCustomer;
