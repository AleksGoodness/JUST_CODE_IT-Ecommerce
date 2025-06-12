import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import CartProduct from '../../components/cart_product/CartProduct';
import Order from '../../components/Order/order';
import { useCreateCartMutation, useGetCartQuery } from '../../services/api';
import clearCartObject from './clearCartObject';

enum ELocalStorage {
  cartId = 'cartId',
  anonymousId = 'anonymousId',
}

const Basket = () => {
  const { data: cart, isLoading } = useGetCartQuery(
    {
      cartId: localStorage.getItem(ELocalStorage.cartId),
    },
    { skip: Boolean(!localStorage.getItem(ELocalStorage.cartId)) },
  );

  const [clearCart, setClearCart] = useState(
    cart ? clearCartObject(cart) : undefined,
  );

  const [createCart] = useCreateCartMutation();

  useEffect(() => {
    const createCartQuery = async () => {
      try {
        const cartResponse = await createCart({
          currency: 'BYN',
          anonymousId: localStorage.getItem(ELocalStorage.anonymousId),
          useAuthClient: false,
        }).unwrap();

        if (cartResponse.id) {
          localStorage.setItem(ELocalStorage.cartId, cartResponse.id);
        }
        if (cartResponse.anonymousId) {
          localStorage.setItem(
            ELocalStorage.anonymousId,
            cartResponse.anonymousId,
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!localStorage.getItem(ELocalStorage.cartId)) createCartQuery();
  }, [createCart]);

  useEffect(() => {
    if (cart) setClearCart(clearCartObject(cart));
  }, [cart]);
  return (
    <>
      <h2>Products in the cart {isLoading ? 'loading...' : ''}</h2>
      <Grid container spacing={4}>
        <Grid
          size={8}
          sx={{
            overflow: 'auto',
            maxHeight: '500px',
            maxWidth: '700px',
          }}
        >
          {clearCart ? <CartProduct cartItem={clearCart} /> : ''}
        </Grid>
        <Grid
          size={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            maxWidth: '380px',
            width: '100%',
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
