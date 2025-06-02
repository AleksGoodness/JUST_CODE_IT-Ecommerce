import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import ProfileIcon from '@mui/icons-material/ManageAccountsSharp';
import IconButton from '@mui/material/IconButton';
import { NavLink } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { getCustomer, getThemeName } from '../../redux/selectors.ts';
import { setTheme } from '../../redux/slices/themeSlice.ts';
import CONSTANTS from '../../utils/CONSTANTS.ts';
import Cart from './Cart/Cart.tsx';
const IconsStack = () => {
  const { customer } = useAppSelector(getCustomer);
  const theme = useAppSelector(getThemeName);

  const dispatch = useAppDispatch();
  return (
    <>
      <IconButton
        color="primary"
        onClick={() => {
          dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
        }}
      >
        {theme === 'light' ? <LightMode /> : <DarkMode />}
      </IconButton>
      <IconButton>
        <Cart />
      </IconButton>
      <IconButton component={NavLink} to={CONSTANTS.profile}>
        <ProfileIcon color={customer ? 'primary' : 'action'} />
      </IconButton>
    </>
  );
};
export default IconsStack;
