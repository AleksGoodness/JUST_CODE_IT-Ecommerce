import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { useNavigate } from 'react-router';

import CartSvg from './CartSvg';
const Cart = (props: SvgIconProps) => {
  const navigate = useNavigate();
  return (
    <SvgIcon component={CartSvg} {...props} onClick={() => navigate('/cart')} />
  );
};
export default Cart;
