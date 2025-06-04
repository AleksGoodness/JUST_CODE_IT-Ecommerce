import { Box, Container, Typography } from '@mui/material';
import { Outlet, useNavigation } from 'react-router';

import BreadCrumbs from '../breadCrumbs/BreadCrumbs';
import FilterSorterSearcher from '../filterSorterSearcher/FilterSorterSearcher';
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
          position: 'relative',
        }}
      >
        <Header />
        <FilterSorterSearcher />
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
          <Typography>Under maintenance</Typography>
          <Typography color="primary">{new Date().getFullYear()}</Typography>
        </Box>
      </Container>
    </>
  );
};

export default Layout;
