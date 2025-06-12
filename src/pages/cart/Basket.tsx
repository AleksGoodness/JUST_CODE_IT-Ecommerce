import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import CartProduct from '../../components/cart_product/CartProduct';
import Order from '../../components/Order/order';
import {
  useCreateCartMutation,
  useGetActiveCartQuery,
} from '../../services/api';
import clearCartObject from './clearCartObject';

enum ELocalStorage {
  anonymousCartId = 'anonymousCartId',
  anonymousId = 'anonymousId',
}

const Basket = () => {
  const { data: cart, isLoading, isError, refetch } = useGetActiveCartQuery({});

  const [clearCart, setClearCart] = useState(
    cart ? clearCartObject(cart) : undefined,
  );

  const [createCart] = useCreateCartMutation();

  useEffect(() => {
    const createCartQuery = async () => {
      try {
        const cartResponse = await createCart({
          currency: 'BYN',
          useAuthClient: false,
        }).unwrap();

        if (cartResponse.id) {
          localStorage.setItem(ELocalStorage.anonymousCartId, cartResponse.id);
        }
        refetch();
      } catch (error) {
        console.log(error);
      }
    };

    if (isError) createCartQuery();
  }, [createCart, refetch, isError]);

  useEffect(() => {
    if (cart) setClearCart(clearCartObject(cart));
  }, [cart]);

  return (
    <>
      <h2>
        Products in the cart {isError ? 'error' : ''}{' '}
        {isLoading ? 'loading...' : ''}
      </h2>
      <Grid container spacing={4}>
        <Grid
          size={7}
          sx={{
            overflow: 'auto',
            maxHeight: '500px',
          }}
        >
          {clearCart ? <CartProduct products={clearCart.products} /> : null}
        </Grid>
        <Grid
          size={5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            border: '2px solid green',
            borderRadius: '8px',
            padding: '20px',
            maxHeight: '500px',
          }}
        >
          {clearCart ? <Order cartItem={clearCart} /> : ''}
        </Grid>
      </Grid>
    </>
  );
};

export default Basket;
