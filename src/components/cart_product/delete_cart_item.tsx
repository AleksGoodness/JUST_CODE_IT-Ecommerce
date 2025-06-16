import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import {
  useGetActiveCartQuery,
  useUpdateCartMutation,
} from '../../services/api';
import { ECartUpdateActions } from '../../services/updateCart.interface';

const DeleteCartItem = ({ lineItemId }: { lineItemId: string }) => {
  const { data: cart } = useGetActiveCartQuery({});
  const [updateCart] = useUpdateCartMutation();

  const handleRemovePurchase = () => {
    if (cart && lineItemId) {
      updateCart({
        cartId: cart.id,
        actionBody: {
          version: cart.version,
          actions: [
            {
              action: ECartUpdateActions.removeProduct,
              lineItemId,
              variantId: 1,
            },
          ],
        },
      });
    }
  };
  return (
    <IconButton onClick={handleRemovePurchase}>
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteCartItem;
