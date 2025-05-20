import './index.css';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { useAppSelector } from './redux/hooks.ts';
import { getThemeName } from './redux/selectors.ts';
import { Router } from './router/router.tsx';
import { darkTheme, lightTheme } from './theme/theme.ts';

export const App = () => {
  const theme = useAppSelector(getThemeName);
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
};
