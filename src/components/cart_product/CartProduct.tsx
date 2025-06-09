//import Purchase from "../purchase/Purchase";
import { useCart } from '../../pages/cart/cart_utils';

const CartProduct = () => {
  const { cartItems } = useCart();
  console.log(cartItems);
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
