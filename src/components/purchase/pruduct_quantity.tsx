import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

import {
  useGetActiveCartQuery,
  useUpdateCartMutation,
} from '../../services/api';
import { ECartUpdateActions } from '../../services/updateCart.interface';

const ProductQuantity = ({
  amount,
  setAmount,
  lineItemId,
  productId,
  isCartLocation,
}: {
  amount: number;
  setAmount?: (v: number) => void;
  lineItemId: string;
  productId: string;

  isCartLocation?: boolean;
}) => {
  const [quantity, setQuantity] = useState(amount);
  const { data: cart, isLoading } = useGetActiveCartQuery({});
  const [updateCart] = useUpdateCartMutation();

  const handleRemovePurchase = () => {
    if (isLoading) return;
    if (quantity > 1 && !isCartLocation) setQuantity(prev => prev - 1);
    if (isCartLocation) {
      setQuantity(prev => prev - 1);
      if (cart && lineItemId) {
        updateCart({
          cartId: cart.id,
          actionBody: {
            version: cart.version,
            actions: [
              {
                action: ECartUpdateActions.removeProduct,
                lineItemId,
                quantity: 1,
                variantId: 1,
              },
            ],
          },
        });
      }
    }
  };

  const handleAddPurchase = () => {
    if (quantity < 99) {
      if (isLoading) return;

      setQuantity(prev => prev + 1);

      if (cart && lineItemId && isCartLocation) {
        updateCart({
          cartId: cart.id,
          actionBody: {
            version: cart.version,
            actions: [
              {
                action: ECartUpdateActions.addNewProduct,
                productId,
                quantity: 1,
                variantId: 1,
              },
            ],
          },
        });
      }
    }
  };

  useEffect(() => {
    if (setAmount) setAmount(quantity);
  }, [quantity, setAmount]);
  return (
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
        size="small"
        sx={{
          zIndex: 0,
        }}
      >
        <RemoveIcon />
      </Fab>
      <Typography
        sx={{
          display: 'block',
          fontSize: '1.2rem',
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
        size="small"
        sx={{
          zIndex: 0,
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default ProductQuantity;
