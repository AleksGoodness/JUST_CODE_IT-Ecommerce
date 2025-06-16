import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import CartProduct from '../../components/cart_product/CartProduct';
import Order from '../../components/Order/order';
import { tokenCache } from '../../ecommerce/clientBuilder';
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
  const refreshToken = tokenCache.get().refreshToken;

  const [clearCart, setClearCart] = useState(
    cart ? clearCartObject(cart) : undefined,
  );

  useEffect(() => {
    refetch();
  }, [refreshToken, refetch]);

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
          size={{ md: 7, sm: 12, xs: 12 }}
          sx={{
            overflowY: 'auto',
            maxHeight: '480px',
            paddingRight: '12px',
            display: 'flex',
            flexDirection: 'column',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'primary.main',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0,0,0,0)',
            },
          }}
        >
          {clearCart ? <CartProduct products={clearCart.products} /> : null}
        </Grid>
        <Grid
          size={{ md: 5, sm: 12, xs: 12 }}
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
