import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';

import {
  useGetActiveCartQuery,
  useGetProductQuery,
  useUpdateCartMutation,
} from '../../services/api';
import { ECartUpdateActions } from '../../services/interfaces/updateCart.interface';
import Bin from '../cart_product/bin';
import ProductQuantity from './pruduct_quantity';

const Purchase = () => {
  const location = useLocation();
  const { data: product } = useGetProductQuery(`/${location.state}`, {
    skip: !location.state,
  });
  const { data: cart } = useGetActiveCartQuery({});
  const lineItem = cart?.lineItems.find(item => item.productId === product?.id);
  const [updateCart] = useUpdateCartMutation();
  const navigate = useNavigate();

  const [amount, setAmount] = useState(1);

  const [activeButton, setActiveButton] = useState<'first' | 'second'>('first');
  const handleAddProduct = () => {
    setActiveButton('second');
    if (cart && product) {
      //todo
      updateCart({
        cartId: cart.id,
        actionBody: {
          version: cart.version,
          actions: [
            {
              action: ECartUpdateActions.addNewProduct,
              productId: product.id,
              quantity: amount,
              variantId: 1,
            },
          ],
        },
      });
      //todo
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {product ? (
        <ProductQuantity
          amount={amount}
          lineItemId={product?.id}
          productId={product?.id}
          setAmount={setAmount}
        />
      ) : null}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          '@media (max-width: 480px)': {
            justifyContent: 'center',
          },
        }}
      >
        <Button
          onClick={() => {
            handleAddProduct();
            setActiveButton('first');
            navigate('/cart');
          }}
          variant={activeButton === 'first' ? 'contained' : 'outlined'}
        >
          BUY NOW
        </Button>

        {lineItem ? (
          <Typography>In the Cart</Typography>
        ) : (
          <Button
            onClick={() => handleAddProduct()}
            variant={activeButton === 'second' ? 'contained' : 'outlined'}
          >
            ADD TO CART
          </Button>
        )}
        {lineItem ? <Bin lineItemId={lineItem.id} /> : null}
      </Box>
    </Box>
  );
};
export default Purchase;
