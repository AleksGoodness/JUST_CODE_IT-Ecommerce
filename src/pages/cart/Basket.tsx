import { Grid } from '@mui/material';
import { useEffect } from 'react';

import CartProduct from '../../components/cart_product/CartProduct';
import { useCreateCartMutation, useGetCartQuery } from '../../services/api';

const Basket = () => {
  const { data: cart, isLoading } = useGetCartQuery(
    {
      cartId: localStorage.getItem('cartId'),
    },
    { skip: Boolean(!localStorage.getItem('cartId')) },
  );
  const [createCart] = useCreateCartMutation();

  useEffect(() => {
    const createCartQuery = async () => {
      try {
        const cartResponse = await createCart({
          currency: 'BYN',
          anonymousId: localStorage.getItem('anonymousID'),
          useAuthClient: false,
        }).unwrap();

        if (cartResponse.id) {
          localStorage.setItem('cartId', cartResponse.id);
        }
        if (cartResponse.anonymousId) {
          localStorage.setItem('anonymousId', cartResponse.anonymousId);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!localStorage.getItem('cartId')) createCartQuery();
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
