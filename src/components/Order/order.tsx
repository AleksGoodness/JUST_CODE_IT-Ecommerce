import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { CartDetails } from '../../pages/cart/clearCartObject';

const Order = ({ cartItem }: { cartItem: CartDetails }) => {
  return (
    <>
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: '1.3rem',
          fontWeight: '500',
        }}
      >
        PROMOCODE (greenery_promo)
      </Typography>
      <TextField
        id="promo"
        label="Enter promo code"
        size="small"
        variant="outlined"
      />
      <Button sx={{ minHeight: '40px' }} variant="contained">
        APPLY PROMOCODE
      </Button>
      <Divider />
      <Typography
        sx={{
          fontSize: '1.1rem',
          textAlign: 'center',
        }}
      >
        Order total
      </Typography>
      <Typography>
        {(cartItem.finalPrice.centAmount / 100).toFixed(2)} BYN
      </Typography>
      <Divider />
      <Typography
        sx={{
          fontSize: '1.1rem',
          textAlign: 'center',
        }}
      >
        Total
      </Typography>
      <Typography>
        {cartItem.totalPriceWithDiscount
          ? (cartItem.totalPriceWithDiscount / 100).toFixed(2)
          : (cartItem.finalPrice.centAmount / 100).toFixed(2)}{' '}
        BYN
      </Typography>
      <Divider />
      <Button sx={{ minHeight: '40px' }} variant="contained">
        PLACE ORDER
      </Button>
    </>
  );
};

export default Order;
