import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

const ProductQuantity = ({
  amount = 1,
  setAmount,
}: {
  amount: number;
  setAmount?: (v: number) => void;
}) => {
  const [quantity, setQuantity] = useState(amount);

  const handleRemovePurchase = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddPurchase = () => {
    if (quantity < 99) setQuantity(prev => prev + 1);
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
