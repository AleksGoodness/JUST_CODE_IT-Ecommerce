import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { ListShop } from './Purchase';

const ProductQuantity = ({ purchases }: ListShop) => {
  const [quantity, setQuantity] = useState(purchases);
  useEffect(() => {
    setQuantity(purchases);
  }, [purchases]);

  const handleRemovePurchase = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddPurchase = () => {
    if (quantity < 99) setQuantity(prev => prev + 1);
  };
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
  );
};

export default ProductQuantity;
