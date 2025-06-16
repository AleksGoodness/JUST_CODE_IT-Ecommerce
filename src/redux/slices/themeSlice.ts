import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ELocalStorage } from '../../services/createCart.interface';

const getTheme = (): 'light' | 'dark' => {
  const theme = localStorage.getItem(ELocalStorage.theme);
  return theme === 'light' || theme === 'dark' ? theme : 'dark';
};

const initialState: { themeName: 'light' | 'dark' } = {
  themeName: getTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,

  reducers: {
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      localStorage.setItem(ELocalStorage.theme, action.payload);
      state.themeName = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
