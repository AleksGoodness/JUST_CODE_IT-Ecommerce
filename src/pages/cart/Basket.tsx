import { Grid } from '@mui/material';
import { useEffect } from 'react';

import CartProduct from '../../components/cart_product/CartProduct';
import Order from '../../components/Order/order';
import { useCreateCartMutation, useGetCartQuery } from '../../services/api';
import cartObject from './cartObject';
import clearCartObject from './clearCartObject';
import { Cart } from './clearCartObject';

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
  console.log(cart);
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
          {cartObject ? (
            <CartProduct cartItem={clearCartObject(cartObject as Cart)} />
          ) : (
            ''
          )}
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
          {cartObject ? (
            <Order cartItem={clearCartObject(cartObject as Cart)} />
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Basket;
