import { ThemeProvider } from '@mui/material';
import { ReactNode, useState } from 'react';

import { AppThemeContext } from './AppThemeContext.tsx';
import { darkTheme, lightTheme } from './theme.ts';

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <AppThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </AppThemeContext.Provider>
  );
};
