import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { getCustomer } from '../../redux/selectors.ts';
import { logOut } from '../../redux/slices/authSlice.ts';
import { Navigation } from '../index.ts';
import Cart from './Cart/Cart.tsx';
import LogoLogin from './LogoLogin/LogoLogin.tsx';
import LogoMain from './LogoMain';
import Magnifier from './Magnifier/Magnifier.tsx';

const Header = () => {
  const { isLoading, customer } = useAppSelector(getCustomer);
  const dispatch = useAppDispatch();

  return (
    <Container
      component="header"
      sx={{
        maxWidth: '1200px',
        // m: '0 auto',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr auto 1fr' },
        gap: '1rem',
        alignItems: 'center',
        padding: '1vw',
      }}
    >
      <Box
        component={NavLink}
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 'clamp(100px, 20vw, 160px)',
          height: '35px',
          aspectRatio: '150/35',
        }}
        to="/"
      >
        <LogoMain />
      </Box>
      <Navigation />
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: { xs: 'center', sm: 'flex-end' },
          gap: 'clamp(0.5rem, 2.2vw, 2rem)',
        }}
      >
        <Box>
          <Magnifier />
        </Box>
        <Box>
          <Cart />
        </Box>
        {customer ? (
          <Button
            component={NavLink}
            onClick={() => dispatch(logOut())}
            sx={{
              maxWidth: 'fit-content',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
              color: 'text.primary',
            }}
            to="/login"
            variant="contained"
          >
            <LogoLogin />
            Logout
          </Button>
        ) : (
          <Button
            component={NavLink}
            sx={{
              maxWidth: 'fit-content',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
              color: 'text.primary',
            }}
            to="/register"
            variant="contained"
          >
            <LogoLogin />
            {isLoading ? 'loading' : 'Login/Register'}
          </Button>
        )}
      </Stack>
    </Container>
  );
};
export default Header;
