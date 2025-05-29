import LoginIcon from '@mui/icons-material/LoginRounded';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import ProfileIcon from '@mui/icons-material/ManageAccountsSharp';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { getCustomer } from '../../redux/selectors.ts';
import { logOut } from '../../redux/slices/authSlice.ts';
import CONSTANTS from '../../utils/CONSTANTS.ts';
import Cart from './Cart/Cart.tsx';
import Magnifier from './Magnifier/Magnifier.tsx';
const IconsStack = () => {
  const dispatch = useAppDispatch();
  const { isLoading, customer } = useAppSelector(getCustomer);
  return (
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
  );
};
export default IconsStack;
