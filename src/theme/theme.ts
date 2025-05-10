import { Components, createTheme } from '@mui/material/styles';

const commonComponents: Components<typeof lightTheme> = {
  MuiTypography: {
    variants: [
      {
        props: { variant: 'mainTitle' },
        style: {
          lineHeight: 1,
          fontWeight: 900,
          fontSize: '4.375rem',
          textTransform: 'uppercase',
        },
      },
      {
        props: { variant: 'secondTitle' },
        style: ({ theme }) => ({
          color: theme.palette.action.active,
          background: theme.palette.action.active,
        }),
      },
      {
        props: { variant: 'sectionTitle' },
        style: {
          lineHeight: 1,
          fontWeight: 700,
          fontSize: '1.875rem',
          textTransform: 'capitalize',
        },
      },
      {
        props: { variant: 'cardTitle' },
        style: {
          lineHeight: 1.3,
          fontWeight: 700,
          fontSize: '1.25rem',
          textTransform: 'capitalize',
        },
      },
      {
        props: { variant: 'listTitle' },
        style: {
          lineHeight: 1.3,
          fontWeight: 900,
          fontSize: '1.125rem',
          textTransform: 'capitalize',
        },
      },
    ],
  },

  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'capitalize',
        fontWeight: '500',
      },
    },
    variants: [
      {
        props: { variant: 'pagination' },
        style: ({ theme }) => ({
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: '4px',
          border: '1px solid #3d3d3d',
          color: '#3d3d3d',
          padding: 0,
          minWidth: 0,
          '&:hover': {
            backgroundColor: theme.palette.action.active,
            color: theme.palette.common.white,
            borderColor: theme.palette.action.active,
          },
        }),
      },
    ],
  },
};

const typography = {
  fontFamily: ['Poppins', 'sans-serif'].join(','),

  body2: {
    lineHeight: 1.7,
  },
};

export const lightTheme = createTheme({
  typography: typography,
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
  typography: typography,

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
