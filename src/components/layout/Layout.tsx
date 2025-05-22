import { Box, Container, Typography } from '@mui/material';
import { Outlet } from 'react-router';

import Header from '../header/Header';

const Layout = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100svh',
      }}
    >
      <Header />
      <Box
        component={'main'}
        sx={{
          flexGrow: 1,
        }}
      >
        <Outlet />
      </Box>
      <Box component={'footer'} sx={{ p: 2, textAlign: 'center' }}>
        <Typography>Under maintenance</Typography>
        <Typography color="primary">{new Date().getFullYear()}</Typography>
      </Box>
    </Container>
  );
};

export default Layout;
