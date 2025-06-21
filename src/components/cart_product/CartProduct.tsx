import { Box, Link } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router';

import { LineItemModified } from '@/pages/basket/utils/clearCartObject';

import ProductQuantity from '../product-quantity/ProductQuantity';
import Title from '../title/Title';
import Bin from './components/bin/Bin';

const CartProduct = ({ products }: { products: LineItemModified[] }) => {
  const navigate = useNavigate();
  return (
    <Grid container spacing={2}>
      {products.length === 0 ? (
        <Title
          onClick={() => navigate('/shop')}
          style={{
            cursor: 'pointer',
            fontSize: '1.5rem',
            textDecoration: 'underline',
          }}
          textAlign={'center'}
        >
          Your cart is empty — time to go shopping!
        </Title>
      ) : null}
      {products.map((item, index) => {
        const price = ((item.price * item.quantity) / 100).toFixed(2);
        const discount = item.discount
          ? ((item.discount / 100) * item.quantity).toFixed(2)
          : null;
        const pricePerItem =
          item.quantity === 1 ? '' : (item.price / 100).toFixed(2);

        const discountPerItem =
          item.quantity === 1 || !discount
            ? null
            : (Number(discount) / item.quantity).toFixed(2);
        return (
          <Grid
            key={index}
            spacing={1}
            sx={{
              bgcolor: 'background.paper',
              display: 'grid',
              width: '100%',
              gridTemplateAreas: {
                sm: `
    'pic  name  name name name name'
    'pic  price  price price price price'
    'pic price  price price price price'
    'pic .  number number bin .'
  `,
                xs: `
    'name  name name name name name name'
    'pic  pic price price price price price'
    'pic pic price price price price price'
    'pic pic number number number number bin'
  `,
              },
              gridTemplateColumns: {
                sm: 'repeat(6, 1fr)',
                xs: 'repeat(7, 1fr)',
              },
              minHeight: '150px',
              padding: 1,
              border: '2px solid green',
              borderRadius: 2,
            }}
          >
            <Grid
              sx={{
                gridArea: 'bin',
                display: 'grid',
                placeContent: 'center',
                justifyContent: 'end',
              }}
            >
              <Bin lineItemId={item.id} />
            </Grid>
            <Grid
              sx={{
                gridArea: 'pic',
                position: 'relative',
                width: '100%',
              }}
            >
              <Box
                alt="product"
                component={'img'}
                loading="lazy"
                src={item.image}
                sx={{
                  position: 'absolute',
                  objectFit: 'cover',
                  height: '100%',
                  width: '100%',
                  borderRadius: 2,
                  aspectRatio: '1/1',
                }}
              />
            </Grid>
            <Grid sx={{ gridArea: 'name', justifyContent: 'center' }}>
              <Link
                component={'button'}
                onClick={() =>
                  navigate(`/shop/all/${item.name}`, { state: item.productId })
                }
                sx={{
                  justifySelf: 'center',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  display: 'block',
                }}
                underline="none"
              >
                {item.name}
              </Link>
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
              fontSize={{ xs: '1rem', sm: 'clamp(0.8rem, 1.5vw, 1rem)' }}
              sx={{ gridArea: 'price', padding: 2 }}
            >
              {pricePerItem ? (
                <Grid
                  color={discount ? 'warning.main' : 'primary.main'}
                  size={{ xs: 12, sm: 6 }}
                  sx={{
                    textDecoration: discount ? 'line-through' : 'none',
                  }}
                >
                  <span>Item: </span>
                  {pricePerItem}
                  <span> {item.currency}</span>
                </Grid>
              ) : null}

              <Grid
                color={discount ? 'warning.main' : 'error.main'}
                fontWeight={discount ? 400 : 900}
                size={{ xs: 12, sm: 6 }}
                sx={{ textDecoration: discount ? 'line-through' : 'none' }}
              >
                <span>Total: </span>
                {price}
                <span> {item.currency}</span>
              </Grid>

              {discountPerItem ? (
                <Grid color={'primary.main'} size={{ xs: 12, sm: 6 }}>
                  <span>Item: </span>
                  {discountPerItem}
                  <span> {item.currency}</span>
                </Grid>
              ) : null}

              {discount ? (
                <Grid
                  fontWeight={900}
                  size={{ xs: 12, sm: 6 }}
                  sx={{ color: 'error.main' }}
                >
                  <span>Total: </span>
                  {discount}
                  <span> {item.currency}</span>
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CartProduct;
