import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

import { CartDetails } from '../../pages/cart/clearCartObject';
import {
  useGetActiveCartQuery,
  useUpdateCartMutation,
} from '../../services/api';
import { ECartUpdateActions } from '../../services/updateCart.interface';
import SendOrder from './send_order';

const Order = ({ cartItem }: { cartItem: CartDetails }) => {
  const { data: cart } = useGetActiveCartQuery({});
  const [updateCart] = useUpdateCartMutation();
  const [promoCode, setPromoCode] = useState(
    localStorage.getItem('promoCode') || '',
  );
  const [error, setError] = useState('');
  const [isPromoLocked, setIsPromoLocked] = useState(
    !!localStorage.getItem('promoCode'),
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!cart) {
      setPromoCode('');
      setIsPromoLocked(false);
    }
  }, [cart]);

  const handleCartDeleted = () => {
    setPromoCode('');
    setIsPromoLocked(false);
  };

  const handleApplyPromocode = async () => {
    setIsSubmitted(true);
    if (!promoCode.trim()) {
      setError('Enter promocode');
      return;
    }
    if (cart) {
      try {
        await updateCart({
          cartId: cart.id,
          actionBody: {
            version: cart.version,
            actions: [
              {
                action: ECartUpdateActions.addDiscountCode,
                code: promoCode,
              },
            ],
          },
        }).unwrap();
        setError('');
        setIsPromoLocked(true);
        localStorage.setItem('promoCode', promoCode);
      } catch {
        setError('The discount code is not valid or cannot be applied');
      }
    }
  };
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
        disabled={isPromoLocked}
        error={isSubmitted ? !!error : false}
        helperText={isSubmitted ? error : ''}
        id="promo"
        label="Enter promo code"
        onChange={e => setPromoCode(e.target.value)}
        size="small"
        sx={{
          '& .MuiInputBase-input': {
            color: 'primary.main',
            fontWeight: '700',
          },
        }}
        value={promoCode}
        variant="outlined"
      />
      <Button
        onClick={handleApplyPromocode}
        sx={{ minHeight: '40px' }}
        variant="contained"
      >
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
      <SendOrder onCartDeleted={handleCartDeleted} />
    </>
  );
};

export default Order;
