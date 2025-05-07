import { Components, createTheme } from '@mui/material/styles';

const commonComponents: Components = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'capitalize',
      },
    },
  },
};

export const lightTheme = createTheme({
  components: commonComponents,
  palette: {
    mode: 'light',
    primary: {
      main: '#46A358',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#3D3D3D',
      secondary: '#727272',
      disabled: '#B3B3B3',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FBFBFB',
    },
    action: {
      active: '#46A358',
      hover: 'rgba(70, 163, 88, 0.04)',
    },
  },
});

export const darkTheme = createTheme({
  components: commonComponents,
  palette: {
    mode: 'dark',
    primary: {
      main: '#6AC178',
      contrastText: '#121212',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#A0A0A0',
      disabled: '#6D6D6D',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    action: {
      active: '#6AC178',
      hover: 'rgba(106, 193, 120, 0.08)',
    },
  },
});
