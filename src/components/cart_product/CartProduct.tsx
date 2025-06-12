//import Purchase from "../purchase/Purchase";
//import { useCart } from '../../pages/cart/cart_utils';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { CartDetails } from '../../pages/cart/clearCartObject';
import ProductQuantity from '../purchase/pruduct_quantity';

const CartProduct = ({ cartItem }: { cartItem: CartDetails }) => {
  // const { cartItems } = useCart();

  return (
    <>
      {cartItem.products.map((item, index) => {
        const price = ((item.price / 100) * item.quantity).toFixed(2);
        const discount = item.discount ? (item.discount / 100).toFixed(2) : '';
        console.log(discount);
        return (
          <Grid
            container
            key={index}
            spacing={1}
            sx={{
              alignItems: 'center',
              maxWidth: '700px',
              minHeight: '150px',
              justifyItems: 'center',
              marginBottom: '10px',
              padding: '10px',
              border: '2px solid green',
              borderRadius: '8px',
            }}
          >
            <Grid size={1}>
              <DeleteIcon sx={{ justifySelf: 'center', display: 'block' }} />
            </Grid>
            <Grid size={2}>
              <Box
                sx={{
                  maxWidth: '150px',
                  maxHeight: '150px',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  alt="pruduct"
                  src={item.image}
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Box>
            </Grid>
            <Grid size={3}>
              <Typography sx={{ justifySelf: 'center' }}>
                {item.name}
              </Typography>
            </Grid>
            <Grid
              size={3}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '32px',
              }}
            >
              <ProductQuantity />
            </Grid>
            <Grid size={3}>
              <Typography sx={{ textAlign: 'center' }}>
                {discount ? (
                  <>
                    <span
                      style={{
                        textDecoration: 'line-through',
                        display: 'block',
                      }}
                    >
                      {price} BYN
                    </span>
                    <span style={{ display: 'block' }}>{discount} BYN</span>
                  </>
                ) : (
                  <span style={{ display: 'block' }}>{price} BYN</span>
                )}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};

export default CartProduct;
