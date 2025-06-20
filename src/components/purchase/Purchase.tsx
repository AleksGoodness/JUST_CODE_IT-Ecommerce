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
    if (quantity < 99) setQuantity(Number(quantity) + 1);
  };

  const [activeButton, setActiveButton] = useState<'first' | 'second'>('first');

  return (
    <Box
      sx={{
        '@media (max-width: 900px)': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
      }}
    >
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
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          '@media (max-width: 480px)': {
            justifyContent: 'center',
          },
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
    </Box>
  );
};

export default Purchase;
