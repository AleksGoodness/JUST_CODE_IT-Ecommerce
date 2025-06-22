import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useGetActiveCartQuery, useUpdateCartMutation } from '@/services/api';

const CleanCart = () => {
  const { data: cart } = useGetActiveCartQuery({});
  const [insane, setInsane] = useState(false);
  const [updateCart] = useUpdateCartMutation();

  const handleClearCart = () => {
    if (cart && cart.lineItems.length > 0) {
      const updateActions = cart.lineItems.map(item => ({
        action: 'removeLineItem',
        lineItemId: item.id,
      }));

      updateCart({
        cartId: cart.id,
        actionBody: {
          version: cart.version,
          actions: updateActions,
        },
      });
    } else {
      toast.warning('Your cart is already empty!');
    }
  };

  return insane ? (
    <Grid alignItems={'center'} container spacing={2}>
      <Grid component={Typography} size={12}>
        ARE YOU SURE?
      </Grid>
      <Grid size={6}>
        <Button
          fullWidth
          onClick={() => {
            setInsane(false);
          }}
          size="large"
          sx={{ backgroundColor: 'primary.main' }}
          variant="contained"
        >
          CANCEL
        </Button>
      </Grid>
      <Grid size={6}>
        <Button
          fullWidth
          onClick={handleClearCart}
          size="large"
          sx={{ backgroundColor: 'error.main' }}
          variant="contained"
        >
          YES
        </Button>
      </Grid>
    </Grid>
  ) : (
    <Button
      onClick={() => {
        if (cart?.lineItems.length) {
          setInsane(true);
          return;
        }

        toast.warning('Your cart is empty');
      }}
      size="large"
      sx={{ backgroundColor: 'error.main' }}
      variant="contained"
    >
      CLEAR CART
    </Button>
  );
};

export default CleanCart;
