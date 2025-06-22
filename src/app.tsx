import './index.css';
import 'swiper/swiper-bundle.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import Loading from './components/loading/Loading.tsx';
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
  const { isError, refetch: refetchCart } = useGetActiveCartQuery({});

  const theme = useAppSelector(getThemeName);
  const dispatch = useAppDispatch();
  const [createCart] = useCreateCartMutation();

  useEffect(() => {
    const createCartQuery = async () => {
      await createCart({
        currency: 'BYN',
        useAuthClient: Boolean(localStorage.getItem(ELocalStorage.isAuth)),
      }).unwrap();
      await refetchCart().unwrap();
    };

    if (isError) createCartQuery();
  }, [createCart, isError, refetchCart]);

  useEffect(() => {
    const refreshToken = tokenCache.get().refreshToken;
    const isAuth = localStorage.getItem(ELocalStorage.isAuth);

    if (refreshToken && isAuth) dispatch(loginSilent());
  }, [dispatch]);

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {!isError ? <Router /> : <Loading />}
      <ToastContainer position="bottom-right" />
    </ThemeProvider>
  );
};
