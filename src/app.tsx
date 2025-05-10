import './index.css';

import { CssBaseline } from '@mui/material';

import { Router } from './router/router.tsx';
import { AppThemeProvider } from './theme/AppThemeProvider.tsx';

export const App = () => {
  return (
    <AppThemeProvider>
      <CssBaseline />
      <Router />
    </AppThemeProvider>
  );
};
