import { createAsyncThunk } from '@reduxjs/toolkit';

import { silentLogin } from '../../../ecommerce/clientBuilder';

const loginSilent = createAsyncThunk('auth/silentLogin', async () => {
  const response = await silentLogin();
  console.log(response);
});

export default loginSilent;
