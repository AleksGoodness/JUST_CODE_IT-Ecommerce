//import Purchase from "../purchase/Purchase";
//import { useCart } from '../../pages/cart/cart_utils';
import { CartDetails } from '../../pages/cart/clearCartObject';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import ProductQuantity from '../purchase/pruduct_quantity';

const CartProduct = ({ cartItem }: { cartItem: CartDetails }) => {
  // const { cartItems } = useCart();
  return (
    <Container>
      <h4>Товары в корзине</h4>
      {cartItem.products.map((item, index) => (
        <Box key={index}>
          <DeleteIcon />
          <img src={item.images[0].url} alt="pruduct" />
          <Typography>{item.name}</Typography>
          <ProductQuantity purchases={cartItem.products[index].quantity} />
        </Box>
      ))}
    </Container>
  );
};

export default CartProduct;
