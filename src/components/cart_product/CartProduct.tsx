import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { LineItemModified } from '../../pages/cart/clearCartObject';
import ProductQuantity from '../purchase/pruduct_quantity';
import Title from '../title/Title';
import DeleteCartItem from './delete_cart_item';

const CartProduct = ({ products }: { products: LineItemModified[] }) => {
  return (
    <Grid container sx={{ gap: { xs: '10px' } }}>
      {products.length === 0 ? (
        <Title pt={'25%'} textAlign={'center'}>
          No items yet
        </Title>
      ) : null}
      {products.map((item, index) => {
        const price = ((item.price * item.quantity) / 100).toFixed(2);
        const discount = item.discount
          ? ((item.discount / 100) * item.quantity).toFixed(2)
          : '';
        return (
          <Grid
            container
            key={index}
            spacing={1}
            sx={{
              display: { xs: 'grid', sm: 'flex' },
              gridTemplateAreas: {
                xs: `'pic pic name name name name'
                  'pic pic price price price price'
                    'pic pic  number number number bin'`,
              },
              gridTemplateColumns: {
                xs: 'repeat(6, 1fr)',
              },
              alignItems: 'center',
              maxWidth: '700px',
              minHeight: '150px',
              justifyItems: 'center',
              padding: '10px',
              border: '2px solid green',
              borderRadius: '8px',
              rowGap: { sm: '10px' },
            }}
          >
            <Grid size={{ md: 1, sm: 1, xs: 2 }} sx={{ gridArea: 'bin' }}>
              <DeleteCartItem lineItemId={item.id} />
            </Grid>
            <Grid size={{ sm: 2 }} sx={{ gridArea: 'pic', height: '100%' }}>
              <img
                alt="pruduct"
                src={item.image}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
              />
            </Grid>
            <Grid size={{ sm: 3 }} sx={{ gridArea: 'name' }}>
              <Typography sx={{ justifySelf: 'center' }}>
                {item.name}
              </Typography>
            </Grid>
            <Grid
              size={{ sm: 'auto' }}
              sx={{
                gridArea: 'number',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ProductQuantity
                amount={item.quantity}
                isCartLocation={true}
                key={item.id}
                lineItemId={item.id}
                productId={item.productId}
              />
            </Grid>
            <Grid
              container
              size={{ sm: 3 }}
              sx={{ gridArea: 'price', justifyContent: 'center' }}
            >
              {discount ? (
                <>
                  <span
                    style={{
                      textDecoration: 'line-through',
                    }}
                  >
                    {price} BYN
                  </span>
                  <span>{discount} BYN</span>
                </>
              ) : (
                <span>{price} BYN</span>
              )}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CartProduct;
