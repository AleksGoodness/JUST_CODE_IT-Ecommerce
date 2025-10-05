import './index.css';
import 'swiper/swiper-bundle.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { tokenCache } from './ecommerce/clientBuilder.ts';
import { useAppDispatch, useAppSelector } from './redux/hooks.ts';
import { getThemeName } from './redux/selectors.ts';
import loginSilent from './redux/slices/asyncThunks/loginSilent.ts';
import { Router } from './router/router.tsx';
import {
  useCreateCartMutation,
  useGetActiveCartQuery,
} from './services/api.ts';
import { ELocalStorage } from './services/interfaces/createCart.interface.ts';
import { darkTheme, lightTheme } from './theme/theme.ts';

export const App = () => {
  const { refetch: refetchCart } = useGetActiveCartQuery({});
  const [noServer, setNoServer] = useState('');

  const theme = useAppSelector(getThemeName);
  const dispatch = useAppDispatch();
  const [createCart] = useCreateCartMutation();

  useEffect(() => {
    try {
      const createCartQuery = async () => {
        await createCart({
          currency: 'BYN',
          useAuthClient: Boolean(localStorage.getItem(ELocalStorage.isAuth)),
        }).unwrap();
        await refetchCart().unwrap();
      };
      createCartQuery();
    } catch (error: unknown) {
      if (error instanceof Error) setNoServer(error.message);
    }
  }, [createCart, refetchCart]);

  useEffect(() => {
    const refreshToken = tokenCache.get().refreshToken;
    const isAuth = localStorage.getItem(ELocalStorage.isAuth);

    if (refreshToken && isAuth) dispatch(loginSilent());
  }, [dispatch]);

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <div>{noServer}</div>
      <Router />
      <ToastContainer position="bottom-right" />
    </ThemeProvider>
  );
};
