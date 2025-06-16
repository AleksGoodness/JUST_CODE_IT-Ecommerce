import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { LineItemModified } from '../../pages/cart/clearCartObject';
import ProductQuantity from '../purchase/pruduct_quantity';
import Title from '../title/Title';
import DeleteCartItem from './delete_cart_item';

const CartProduct = ({ products }: { products: LineItemModified[] }) => {
  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
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
        const pricePerItem =
          item.quantity === 1 ? '' : (item.price / 100).toFixed(2);
        const discountPerItem =
          item.quantity === 1
            ? ''
            : (Number(discount) / item.quantity).toFixed(2);
        console.log(discountPerItem);
        return (
          <Grid
            key={index}
            spacing={1}
            sx={{
              display: 'grid',
              width: '100%',
              gridTemplateAreas: {
                xs: `
    'pic pic name name name name'
    'pic pic price price price price'
    'pic pic number number number bin'
  `,
                md: `
    'pic name name price price bin'
    'pic name name number number bin'
  `,
              },
              gridTemplateColumns: 'repeat(6, 1fr)',
              minHeight: '150px',
              height: '150px',
              justifyItems: 'center',
              padding: 1,
              border: '2px solid green',
              borderRadius: 2,
              rowGap: { sm: '10px' },
            }}
          >
            <Grid
              component={DeleteCartItem}
              lineItemId={item.id}
              sx={{ gridArea: 'bin', display: 'grid', placeContent: 'center' }}
            />
            <Grid
              sx={{
                gridArea: 'pic',
                position: 'relative',
                width: '100%',
              }}
            >
              <img
                alt="product"
                loading="lazy"
                src={item.image}
                style={{
                  position: 'absolute',
                  objectFit: 'cover',
                  objectPosition: '50% 75%',
                  width: '100%',
                  height: '100%',
                }}
              />
            </Grid>
            <Grid sx={{ gridArea: 'name' }}>
              <Typography sx={{ justifySelf: 'center', fontWeight: 'bold' }}>
                {item.name}
              </Typography>
            </Grid>
            <Grid
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
              sx={{ gridArea: 'price', justifyContent: 'center' }}
            >
              {discount ? (
                <>
                  <span
                    style={{
                      textDecoration: 'line-through',
                      textDecorationColor: 'red',
                    }}
                  >
                    {pricePerItem} {price}
                  </span>
                  <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>
                    {discountPerItem} {discount} BYN
                  </span>
                </>
              ) : (
                <span
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {pricePerItem} {price} BYN
                </span>
              )}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CartProduct;
