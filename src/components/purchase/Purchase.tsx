import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';

import ProductQuantity from './pruduct_quantity';

export interface ListShop {
  purchases: number;
}

const Purchase = ({ purchases }: ListShop) => {
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
      <ProductQuantity purchases={purchases} />
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
          onClick={() => setActiveButton('first')}
          variant={activeButton === 'first' ? 'contained' : 'outlined'}
        >
          BUY NOW
        </Button>

        <Button
          onClick={() => setActiveButton('second')}
          variant={activeButton === 'second' ? 'contained' : 'outlined'}
        >
          ADD TO CART
        </Button>
      </Box>
    </Box>
  );
};
export default Purchase;
