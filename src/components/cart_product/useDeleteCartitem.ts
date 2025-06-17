import {
  useGetActiveCartQuery,
  useUpdateCartMutation,
} from '../../services/api';
import { ECartUpdateActions } from '../../services/interfaces/updateCart.interface';

const useDeleteCartItem = () => {
  const { data: cart } = useGetActiveCartQuery({});
  const [updateCart] = useUpdateCartMutation();

  const deleteItem = (lineItemId: string) => {
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

  return deleteItem;
};
export default useDeleteCartItem;
