import { RootState } from './store';

export const getThemeName = (state: RootState) => state.theme.themeName;
