import LoginIcon from '@mui/icons-material/LoginRounded';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import { Button, SxProps, Theme } from '@mui/material';
import { NavLink } from 'react-router';

import { useAppDispatch } from '../../redux/hooks.ts';
import { useAppSelector } from '../../redux/hooks.ts';
import { getCustomer } from '../../redux/selectors.ts';
import { logOut } from '../../redux/slices/authSlice.ts';
import { ecommerceApi } from '../../services/api.ts';

interface Props {
  setIsOpen?: (value: boolean) => void;
  sx?: SxProps<Theme>;
}

const LoginRegisterButton = ({ setIsOpen, sx, ...rest }: Props) => {
  const dispatch = useAppDispatch();
  const { customer } = useAppSelector(getCustomer);

  const handleRedirect = () => {
    if (setIsOpen) setIsOpen(false);
    dispatch(logOut());
    dispatch(ecommerceApi.util.invalidateTags(['Customer']));
  };
  return (
    <Button
      component={NavLink}
      endIcon={customer ? <LogoutIcon /> : null}
      onClick={() => handleRedirect()}
      startIcon={customer ? null : <LoginIcon />}
      sx={{
        ...sx,
        display: 'flex',
      }}
      {...rest}
      to={'/login'}
      variant="contained"
    >
      {customer ? 'Logout' : 'Login/Register'}
    </Button>
  );
};

export default LoginRegisterButton;
