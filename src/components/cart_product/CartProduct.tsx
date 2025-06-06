//import Purchase from "../purchase/Purchase";
import { useCart } from './cart_context';

const CartProduct = () => {
  const { cartItems } = useCart();
  return (
    <div>
      <h1>Товары в корзине</h1>
      {cartItems.map((item, index) => (
        <p key={index}>
          {item.name} - ${item.price}
        </p>
      ))}
    </div>
  );
};

export default CartProduct;
