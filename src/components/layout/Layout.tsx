import { Box, Container, Typography } from '@mui/material';
import { Outlet, useNavigation } from 'react-router';

import Header from '../header/Header';
import Loading from '../loading/Loading';

const Layout = () => {
  const navigation = useNavigation();
  return (
    <>
      {navigation.state === 'loading' ? <Loading /> : null}
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
    </>
  );
};

export default Layout;
