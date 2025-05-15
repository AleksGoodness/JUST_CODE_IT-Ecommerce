import SvgIcon from '@mui/material/SvgIcon';

import { lightTheme } from '../../../theme/theme';
import CartSvg from './CartSvg';
const Cart = () => {
  return (
    <SvgIcon
      component={CartSvg}
      sx={{
        fontSize: { xs: 20, sm: 26, md: 32 },
        color: lightTheme.palette.primary.main,
        transition: 'color 0.3s',
        cursor: 'pointer',
        '&:hover': {
          color: lightTheme.palette.primary.dark,
        },
      }}
      viewBox="0 -5 30 30"
    />
  );
};
export default Cart;
