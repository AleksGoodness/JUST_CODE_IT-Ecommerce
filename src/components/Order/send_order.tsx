import Button from '@mui/material/Button';

import {
  useDeleteCartMutation,
  useGetActiveCartQuery,
} from '../../services/api';
import { toast } from 'react-toastify';

const SendOrder = ({ onCartDeleted }: { onCartDeleted: () => void }) => {
  const { data: cart } = useGetActiveCartQuery({});
  const [deleteCart] = useDeleteCartMutation();

  const handleDeleteCart = async () => {
    if (cart) {
      try {
        const response = await deleteCart({
          cartId: cart.id,
          cartVersion: cart.version,
        }).unwrap();

        console.log('Response:', response);
        localStorage.removeItem('promoCode');
        onCartDeleted();
        toast.success('Your order is accepted');
      } catch (error) {
        console.error('Cart deletion failed:', error);
      }
    }
  };

  return (
    <Button
      onClick={handleDeleteCart}
      sx={{ minHeight: '40px' }}
      variant="contained"
    >
      PLACE ORDER
    </Button>
  );
};

export default SendOrder;
