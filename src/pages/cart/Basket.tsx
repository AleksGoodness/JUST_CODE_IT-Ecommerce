import { Grid } from '@mui/material';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

import CartProduct from '../../components/cart_product/CartProduct';
import Order from '../../components/Order/order';
import { useGetActiveCartQuery } from '../../services/api';
import clearCartObject from './clearCartObject';

const Basket = () => {
  const { data: cart, isLoading, isError } = useGetActiveCartQuery({});

  const [clearCart, setClearCart] = useState(
    cart ? clearCartObject(cart) : undefined,
  );

  useEffect(() => {
    if (cart) setClearCart(clearCartObject(cart));
  }, [cart]);

  return (
    <>
      <h2>
        Products in the cart {isError ? 'error' : ''}{' '}
        {isLoading ? 'loading...' : ''}
      </h2>
      <Grid
        animate={{ scale: 1 }}
        component={motion.div}
        container
        initial={{ scale: 0 }}
        spacing={4}
      >
        <Grid
          container
          size={{ md: 7, sm: 12, xs: 12 }}
          spacing={1}
          sx={{
            overflowY: 'auto',
            maxHeight: '480px',
            paddingRight: '12px',
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

        {clearCart ? <Order cartItem={clearCart} /> : null}
      </Grid>
    </>
  );
};

export default Basket;
