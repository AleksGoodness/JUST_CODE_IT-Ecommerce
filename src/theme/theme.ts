import type { Theme } from '@mui/material';
import { Components, createTheme } from '@mui/material/styles';

const commonComponents: Components<Theme> = {
  MuiTypography: {
    variants: [
      {
        props: { variant: 'mainTitle' },
        style: ({ theme }) => ({
          lineHeight: 1,
          fontWeight: 900,
          textTransform: 'uppercase',
          fontSize: '2rem',
          [theme.breakpoints.up('md')]: {
            fontSize: '4.75rem',
          },
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
  MuiLink: {
    variants: [
      {
        props: { variant: 'navLink' },
        style: ({ theme }) => ({
          textTransform: 'capitalize',
          transition: 'border-bottom 0.5s ease-in-out',
          textDecoration: 'none',
          padding: '0 0.7em',
          position: 'relative',
          fontSize: 'clamp(1rem, 1.9vw, 1.3rem)',

          '&::after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            bottom: '-0.8em',
            left: '12.5%',
            height: '3px',
            transition: 'transform 0.3s ease',
            transformOrigin: 'center',
            transform: 'scaleX(0)',
            width: '75%',
          },

          '&.active': {
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            '&::after': {
              transform: 'scaleX(1)',
              backgroundColor: theme.palette.primary.main,
            },
          },
          '&.pending': {
            opacity: 0.6,
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
    secondary: {
      main: '#ffffff',
      contrastText: '#46A358',
    },
    text: {
      primary: '#3D3D3D',
      secondary: '#727272',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FBFBFB',
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
    secondary: {
      main: '#1E1E1E',
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
