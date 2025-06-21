import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import useDeleteCartItem from './useDeleteCartItem';

interface BinProps {
  lineItemId: string;
}

const Bin = ({ lineItemId }: BinProps) => {
  const deleteCartItem = useDeleteCartItem();

  const handleDelete = () => {
    deleteCartItem(lineItemId);
  };

  return (
    <IconButton
      aria-label="delete product from cart"
      onClick={handleDelete}
      sx={{ p: 0 }}
    >
      <DeleteIcon />
    </IconButton>
  );
};

export default Bin;
