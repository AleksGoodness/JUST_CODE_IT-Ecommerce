import CartProduct from '../../components/cart_product/CartProduct';
import { cart1 } from './cartObject';
const Basket = () => {
  return <CartProduct cartItem={cart1} />;
};

export default Basket;
