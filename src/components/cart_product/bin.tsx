import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import useDeleteCartItem from './useDeleteCartitem';

interface BinProps {
  lineItemId: string;
}

const Bin = ({ lineItemId }: BinProps) => {
  const deleteCartItem = useDeleteCartItem();

  const handleDelete = () => {
    deleteCartItem(lineItemId);
  };

  return (
    <IconButton onClick={handleDelete}>
      <DeleteIcon />
    </IconButton>
  );
};

export default Bin;
