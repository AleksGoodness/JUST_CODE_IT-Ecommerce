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
        textTransform: 'uppercase',
        fontWeight: '500',
      },
    },
    variants: [
      {
        props: { variant: 'pagination' },
        style: () => ({
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
          '&:hover': {},
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
          padding: '0 1rem',
          position: 'relative',
          fontSize: '1.3rem',

          '&::after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            bottom: '-0.2rem',
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
      {
        props: { variant: 'categoryLink' },
        style: ({ theme }) => ({
          textTransform: 'capitalize',
          textDecoration: 'none',
          position: 'relative',
          fontSize: '13px',
          '&.active': {
            fontWeight: 'bold',
            color: theme.palette.primary.main,
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
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

export const lightTheme = createTheme({
  typography: typography,
  components: commonComponents,
  breakpoints,
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
      paper: '#f2fcf4',
    },
  },
});

export const darkTheme = createTheme({
  components: commonComponents,
  typography: typography,
  breakpoints,

  palette: {
    mode: 'dark',
    primary: {
      main: '#46A358',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#ffffff',
      contrastText: '#727272',
    },
    text: {
      primary: '#ffffff',
      secondary: '#D1D5DE',
    },
    background: {
      default: '#1E1E1E',
      paper: '#1a1919',
    },
  },
});
