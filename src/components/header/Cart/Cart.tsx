import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

import CartSvg from './CartSvg';
const Cart = (props: SvgIconProps) => {
  return <SvgIcon component={CartSvg} {...props} />;
};
export default Cart;
