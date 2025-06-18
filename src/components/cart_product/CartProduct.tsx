import { Link } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router';

import { LineItemModified } from '../../pages/cart/clearCartObject';
import ProductQuantity from '../purchase/pruduct_quantity';
import Title from '../title/Title';
import Bin from './bin';

const CartProduct = ({ products }: { products: LineItemModified[] }) => {
  const navigate = useNavigate();
  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
      {products.length === 0 ? (
        <Title
          onClick={() => navigate('/shop')}
          pt={'25%'}
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
          : '';
        const pricePerItem =
          item.quantity === 1 ? '' : (item.price / 100).toFixed(2);
        const discountPerItem =
          item.quantity === 1
            ? ''
            : (Number(discount) / item.quantity).toFixed(2);
        return (
          <Grid
            key={index}
            spacing={1}
            sx={{
              display: 'grid',
              width: '100%',
              gridTemplateAreas: {
                sm: `
    'name  name  price price price price'
    'pic pic  price price price price'
    'pic pic  price price price price'
    'pic pic  price price price price'
    'pic pic  price price price price'
    'pic pic  nember number number bin'
    'pic pic  nember number number bin'
  `,
                xs: `
    'name  name name price price price price'
    'pic pic pic price price price price'
    'pic pic pic price price price price'
    'pic pic pic price price price price'
    'pic pic pic price price price price'
    'pic pic pic nember number bin bin'
    'pic pic pic nember number bin bin'
  `,
              },
              gridTemplateColumns: {
                sm: 'repeat(6, 1fr)',
                xs: 'repeat(7, 1fr)',
              },
              minHeight: '150px',
              height: '150px',
              // justifyItems: 'center',
              padding: 1,
              border: '2px solid green',
              borderRadius: 2,
              // rowGap: { sm: '10px' },
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
              <img
                alt="product"
                loading="lazy"
                src={item.image}
                style={{
                  position: 'absolute',
                  objectFit: 'contain',
                  // objectPosition: '50% 75%',
                  width: '100%',
                  height: '100%',
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
              sx={{ gridArea: 'price', justifyContent: 'center', p: 0 }}
            >
              {discount && item.quantity > 1 ? (
                <>
                  <span
                    style={{
                      textDecoration: 'line-through',
                      textDecorationColor: 'red',
                    }}
                  >
                    {pricePerItem} {price}
                  </span>
                  <span
                    style={{
                      marginLeft: '5px',
                      fontWeight: 'bold',
                    }}
                  >
                    {discountPerItem} {`(${discount})`} BYN
                  </span>
                </>
              ) : discount ? (
                <>
                  <span
                    style={{
                      textDecoration: 'line-through',
                      textDecorationColor: 'red',
                    }}
                  >
                    {price} BYN
                  </span>
                  <span
                    style={{
                      marginLeft: '5px',
                      fontWeight: 'bold',
                    }}
                  >
                    {discount} BYN
                  </span>
                </>
              ) : (
                <span style={{ fontWeight: 'bold' }}>
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
