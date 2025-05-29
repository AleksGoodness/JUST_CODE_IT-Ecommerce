import LoginIcon from '@mui/icons-material/LoginRounded';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import ProfileIcon from '@mui/icons-material/ManageAccountsSharp';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Container, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { NavLink } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { getCustomer } from '../../redux/selectors.ts';
import { logOut } from '../../redux/slices/authSlice.ts';
import CONSTANTS from '../../utils/CONSTANTS.ts';
import { Navigation } from '../index.ts';
import Cart from './Cart/Cart.tsx';
import AsidePanel from './DropDownPanel.tsx';
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
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <StyledHeader>
      <Container
        sx={{
          // margin: '0 auto',
          gridTemplateColumns: { xs: '1fr', sm: '1fr auto 1fr' },
          // gap: '1rem',
          // alignItems: 'center',
          padding: '1vw',
          // breakAfter:
          display: { xs: 'flex', sm: 'grid' },
          justifyContent: 'space-between',
        }}
      >
        <Box
          component={NavLink}
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '180px',
          }}
          to="/"
        >
          <LogoMain />
        </Box>
        <IconButton
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          sx={{ display: { md: 'none' } }}
        >
          <MenuRoundedIcon />
        </IconButton>
        <Navigation
          sx={{
            display: { xs: 'none', md: 'flex' },
          }}
        />
        <Stack
          direction="row"
          sx={{
            display: { xs: 'none', sm: 'flex' },
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
              endIcon={<LogoutIcon />}
              onClick={() => dispatch(logOut())}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                fontSize: { xs: 0, md: '1rem' },
              }}
              to="/login"
              variant="contained"
            >
              Logout
            </Button>
          ) : (
            <Button
              component={NavLink}
              startIcon={<LoginIcon />}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                fontSize: { xs: 0, md: '1rem' },
              }}
              to="/register"
              variant="contained"
            >
              {isLoading ? 'loading' : 'Login/Register'}
            </Button>
          )}
        </Stack>
        {isOpen ? <AsidePanel isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
      </Container>
    </StyledHeader>
  );
};
export default Header;
