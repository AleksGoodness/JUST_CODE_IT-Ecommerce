import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import ProfileIcon from '@mui/icons-material/ManageAccountsSharp';
import { Badge } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { NavLink } from 'react-router';

import { LineItem } from '@/pages/basket/utils/clearCartObject.ts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks.ts';
import { getCustomer, getThemeName } from '@/redux/selectors.ts';
import { setTheme } from '@/redux/slices/themeSlice.ts';
import { useGetActiveCartQuery } from '@/services/api.ts';
import CONSTANTS from '@/utils/CONSTANTS.ts';

import Cart from './cart/Cart.tsx';
const IconsStack = () => {
  const { customer } = useAppSelector(getCustomer);
  const theme = useAppSelector(getThemeName);
  const { data: cart } = useGetActiveCartQuery({});

  const getQuantity = (items?: LineItem[]) => {
    if (items) {
      return items.reduce((acc, cur) => (acc += cur.quantity), 0);
    }
    return 0;
  };

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
        <Badge badgeContent={getQuantity(cart?.lineItems)} color="warning">
          <Cart />
        </Badge>
      </IconButton>
      <IconButton component={NavLink} to={CONSTANTS.profile}>
        <ProfileIcon color={customer ? 'primary' : 'action'} />
      </IconButton>
    </>
  );
};
export default IconsStack;
