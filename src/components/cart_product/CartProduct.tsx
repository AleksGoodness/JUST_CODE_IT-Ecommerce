//import Purchase from "../purchase/Purchase";
import { useCart } from '../../pages/cart/cart_utils';

const CartProduct = () => {
  const { cartItems } = useCart();
  return (
    <div>
      {cartItems.map((item, index) => (
        <p key={index}>
          {item.name} - ${item.price}
        </p>
      ))}
    </div>
  );
};

export default CartProduct;
