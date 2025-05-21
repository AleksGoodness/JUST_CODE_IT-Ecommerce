import './index.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';

import { tokenCache } from './ecommerce/clientBuilder.ts';
import { useAppDispatch, useAppSelector } from './redux/hooks.ts';
import { getThemeName } from './redux/selectors.ts';
import loginSilent from './redux/slices/asyncThunks/loginSilent.ts';
import { Router } from './router/router.tsx';
import { darkTheme, lightTheme } from './theme/theme.ts';

export const App = () => {
  const theme = useAppSelector(getThemeName);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const refreshToken = tokenCache.get().refreshToken;

    if (!refreshToken) return;
    dispatch(loginSilent());
  }, [dispatch]);

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
};
