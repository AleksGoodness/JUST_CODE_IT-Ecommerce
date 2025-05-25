import ProfileIcon from '@mui/icons-material/ManageAccountsSharp';
import { Container, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { getCustomer } from '../../redux/selectors.ts';
import { logOut } from '../../redux/slices/authSlice.ts';
import CONSTANTS from '../../utils/CONSTANTS.ts';
import { Navigation } from '../index.ts';
import Cart from './Cart/Cart.tsx';
import LogoLogin from './LogoLogin/LogoLogin.tsx';
import LogoMain from './LogoMain';
import Magnifier from './Magnifier/Magnifier.tsx';

const StyledHeader = styled('header')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
}));

const Header = () => {
  const { isLoading, customer } = useAppSelector(getCustomer);
  const dispatch = useAppDispatch();

  return (
    <StyledHeader>
      <Container
        sx={{
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr auto 1fr' },
          gap: '1rem',
          alignItems: 'center',
          padding: '1vw 0',
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
          <IconButton>
            <Magnifier />
          </IconButton>
          <IconButton>
            <Cart />
          </IconButton>
          <IconButton component={NavLink} to={CONSTANTS.profile}>
            <ProfileIcon color={customer ? 'primary' : 'action'} />
          </IconButton>

          {customer ? (
            <Button
              component={NavLink}
              endIcon={<LogoLogin />}
              onClick={() => dispatch(logOut())}
              to="/login"
              variant="contained"
            >
              Logout
            </Button>
          ) : (
            <Button
              component={NavLink}
              startIcon={<LogoLogin />}
              to="/register"
              variant="contained"
            >
              {isLoading ? 'loading' : 'Login/Register'}
            </Button>
          )}
        </Stack>
      </Container>
    </StyledHeader>
  );
};
export default Header;
