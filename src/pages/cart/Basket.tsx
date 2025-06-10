import { Grid } from '@mui/material';
import { useEffect } from 'react';

import CartProduct from '../../components/cart_product/CartProduct';
import { useCreateCartMutation, useGetCartQuery } from '../../services/api';

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
    <Grid>
      <h1>Товары в корзине {isLoading ? 'loading...' : ''}</h1>
      <CartProduct />
    </Grid>
  );
};

export default Basket;
