import { Box, Container, Typography } from '@mui/material';
import { Outlet } from 'react-router';

import BreadCrumbs from '../bread-crumbs/BreadCrumbs';
import Header from '../header/Header';

const Layout = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100svh',
        position: 'relative',
      }}
    >
      <Header />
      <Box
        component={'main'}
        sx={{
          flexGrow: 1,
          paddingTop: '0.5rem',
        }}
      >
        <BreadCrumbs />
        <Outlet />
      </Box>
      <Box component={'footer'} sx={{ p: 2, textAlign: 'center' }}>
        <Typography>Developed by JustCodeIt</Typography>
        <Typography color="primary">{new Date().getFullYear()}</Typography>
      </Box>
    </Container>
  );
};

export default Layout;
