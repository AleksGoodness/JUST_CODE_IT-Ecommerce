import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

interface ListShop {
  purchases: number;
}

const Purchase = ({ purchases }: ListShop) => {
  const [quantity, setQuantity] = useState(purchases);
  const handleRemovePurchase = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const handleAddPurchase = () => {
    setQuantity(Number(quantity) + 1);
  };

  const [activeButton, setActiveButton] = useState<'first' | 'second'>('first');

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          maxWidth: '150px',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
        }}
      >
        <Fab
          aria-label="remove"
          color="primary"
          onClick={handleRemovePurchase}
          size="medium"
        >
          <RemoveIcon />
        </Fab>
        <Typography
          sx={{
            display: 'block',
            fontSize: '1.5rem',
            fontWeight: '400',
          }}
        >
          {quantity}
        </Typography>
        <Fab
          aria-label="remove"
          color="primary"
          onClick={handleAddPurchase}
          size="medium"
        >
          <AddIcon />
        </Fab>
      </Box>
      <Box
        sx={{
          display: 'flex',
          maxWidth: '350px',
          width: '100%',
          gap: '20px',
        }}
      >
        <Button
          onClick={() => {
            setActiveButton('first');
          }}
          variant={activeButton === 'first' ? 'contained' : 'outlined'}
        >
          BUY NOW
        </Button>
        <Button
          onClick={() => {
            setActiveButton('second');
          }}
          variant={activeButton === 'second' ? 'contained' : 'outlined'}
        >
          ADD TO CART
        </Button>
      </Box>
    </>
  );
};

export default Purchase;
