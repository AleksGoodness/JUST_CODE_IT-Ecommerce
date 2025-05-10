import { createContext } from 'react';

interface IAppThemeContext {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export const AppThemeContext = createContext<IAppThemeContext>({
  toggleTheme: () => {
    console.log('theme');
  },
  isDarkMode: false,
});
