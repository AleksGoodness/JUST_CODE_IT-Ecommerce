import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

import { CartDetails } from '@/pages/basket/utils/clearCartObject';
import { useGetActiveCartQuery, useUpdateCartMutation } from '@/services/api';
import { ECartUpdateActions } from '@/services/interfaces/updateCart.interface';

import Title from '../title/Title';
import CleanCart from './components/CleanCart';
import SendOrder from './components/SendOrder';

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
      setError('Enter promo-code');
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
    <Grid
      alignSelf={'flex-start'}
      bgcolor={'background.paper'}
      border={'2px solid'}
      borderColor={'primary.main'}
      borderRadius={2}
      container
      direction={'column'}
      gap={2}
      p={{ xs: 2, sm: 1, md: 2 }}
      size={{ xs: 12, sm: 4, md: 6 }}
    >
      <Title
        sx={{
          textAlign: 'center',
        }}
        variant="subheader"
      >
        PROMO CODE
      </Title>
      <TextField
        disabled={isPromoLocked}
        error={isSubmitted ? !!error : false}
        id="promo"
        label="Enter promo-code"
        onBlur={() => {
          if (!promoCode.trim()) {
            setError('');
          }
        }}
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
        sx={{ fontSize: '0.8rem' }}
        variant="contained"
      >
        APPLY PROMO CODE
      </Button>
      <Divider />
      <Grid container>
        <Grid size={{ xs: 12, md: 6 }}>
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
        </Grid>
        {/* <Grid component={Divider} size={12} /> */}
        <Grid size={{ xs: 12, md: 6 }}>
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
        </Grid>
      </Grid>
      <Divider />
      <SendOrder onCartDeleted={handleCartDeleted} />
      <CleanCart />
    </Grid>
  );
};

export default Order;
