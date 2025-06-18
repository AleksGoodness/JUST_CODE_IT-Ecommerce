import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

//import { toast } from 'react-toastify';
import {
  useGetActiveCartQuery,
  useUpdateCartMutation,
} from '../../services/api';

const CleanCart = () => {
  const { data: cart } = useGetActiveCartQuery({});
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
      toast.success('Your cart is empty');
    } else {
      toast.warning('Your cart is already empty!');
    }
  };

  return (
    <Button
      onClick={handleClearCart}
      size="large"
      sx={{ backgroundColor: 'error.main' }}
      variant="contained"
    >
      CLEAR CART
    </Button>
  );
};

export default CleanCart;
