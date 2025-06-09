import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useCart } from '../../pages/cart/cart_utils';
import {
  checkAnonymousCart,
  checkLoginUser,
  createAnonymousCart,
} from '../../pages/cart/cart_utils';
import { useCartCreate } from '../../pages/cart/cart_utils';
import { ProductDetails } from '../../pages/details/clearObject';

interface ListShop {
  purchases: number;
  product: ProductDetails | null;
}

const Purchase = ({ purchases, product }: ListShop) => {
  const [quantity, setQuantity] = useState(purchases);
  const handleRemovePurchase = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleAddPurchase = () => {
    if (quantity < 99) setQuantity(Number(quantity) + 1);
  };

  const [activeButton, setActiveButton] = useState<'first' | 'second'>('first');
  const { saveCartId } = useCartCreate();
  const { addToCart, setCartId } = useCart();

  useEffect(() => {
    const id = saveCartId();
    if (id) setCartId(id);
  }, [saveCartId, setCartId]);

  const navigate = useNavigate();

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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          pb: 4,
        }}
      >
        <Fab
          aria-label="remove"
          color="primary"
          onClick={handleRemovePurchase}
          size="medium"
          sx={{
            zIndex: 0,
          }}
        >
          <RemoveIcon />
        </Fab>
        <Typography
          sx={{
            display: 'block',
            fontSize: '1.5rem',
            fontWeight: '400',
            minWidth: '2rem',
            textAlign: 'center',
          }}
        >
          {quantity}
        </Typography>
        <Fab
          aria-label="remove"
          color="primary"
          onClick={handleAddPurchase}
          size="medium"
          sx={{
            zIndex: 0,
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
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
            if (product && checkAnonymousCart()) {
              addToCart(product);
              navigate('/cart');
            } else if (product && checkLoginUser()) {
              saveCartId();
            } else if (product) {
              createAnonymousCart();
            } else {
              console.error("Error: product isn't loaded!");
            }
            if (!product) {
              console.error("Error: product isn't loaded!");
            } else if (checkAnonymousCart()) {
              addToCart(product);
              navigate('/cart');
            } else if (checkLoginUser()) {
              console.log('hi');
            }
            setActiveButton('first');
          }}
          variant={activeButton === 'first' ? 'contained' : 'outlined'}
        >
          BUY NOW
        </Button>
        <Button
          onClick={() => {
            if (product && checkAnonymousCart()) {
              addToCart(product);
            } else if (product && checkLoginUser()) {
              saveCartId();
            } else if (product) {
              createAnonymousCart();
            } else {
              console.error("Error: product isn't loaded!");
            }
            setActiveButton('second');
          }}
          variant={activeButton === 'second' ? 'contained' : 'outlined'}
        >
          ADD TO CART
        </Button>
      </Box>
    </Box>
  );
};
export default Purchase;
