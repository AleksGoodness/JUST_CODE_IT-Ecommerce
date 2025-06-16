import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

import {
  useGetActiveCartQuery,
  useGetProductQuery,
  useUpdateCartMutation,
} from '../../services/api';
import { ECartUpdateActions } from '../../services/interfaces/updateCart.interface';
import ProductQuantity from './pruduct_quantity';

const Purchase = () => {
  const { plantName } = useParams();
  const { data: product } = useGetProductQuery(`/${plantName}`);
  const { data: cart } = useGetActiveCartQuery({});
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
        '@media (max-width: 900px)': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
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

        <Button
          onClick={() => handleAddProduct()}
          variant={activeButton === 'second' ? 'contained' : 'outlined'}
        >
          ADD TO CART
        </Button>
      </Box>
    </Box>
  );
};
export default Purchase;
