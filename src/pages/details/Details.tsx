import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import AttributeBox from '../../components/attributeBox/AttributeBox';
import Purchase from '../../components/purchase/Purchase';
import Slider from '../../components/slider/slider';
import { useGetProductsQuery } from '../../services/api';
import CONSTANTS from '../../utils/CONSTANTS';
import clearDiscountObject from './clearDiscountObject';
import clearObject from './clearObject';
import discountObject from './dicountObject';
import tempObject from './tempObjext';
import { findDiscount, formatPrice } from './utilsDetails';
const myProduct = clearObject(tempObject);
const myDiscount = clearDiscountObject(discountObject);

const Details = () => {
  const { category, plantName } = useParams();
  const { data } = useGetProductsQuery(`/${plantName}`);
  const [product, setProduct] = useState(myProduct);
  const navigate = useNavigate();
  const discountPrice = findDiscount(product.cost, myDiscount.value);
  const currency = product.currency;
  const formattedDiscountPrice = formatPrice(currency, discountPrice);
  const discount = myDiscount.names?.includes(product.sku)
    ? formattedDiscountPrice + '  Special Offer'
    : '';
  const slides = product.images;
  const imagesUrl = slides.map(slide => slide.url);
  const mainImage = imagesUrl[0];
  const attributes = product.attributes;
  useEffect(() => {
    if (!category && !plantName) {
      navigate(CONSTANTS.shop);
      return;
    }
    if (!category) {
      navigate(CONSTANTS.shop);
      return;
    }

    if (!plantName) {
      navigate(`${CONSTANTS.shop}/${category}`);
      return;
    }

    if (data) {
      const cleanObject = clearObject(data);
      setProduct(cleanObject);
    }
  }, [navigate, plantName, category, data]);

  return (
    <Container
      animate={{ scale: 1 }}
      component={motion.div}
      initial={{ scale: 0 }}
    >
      <Grid
        container
        direction="row"
        spacing={4}
        sx={{
          marginTop: '30px',
        }}
      >
        <Grid size={{ md: 6, sm: 12, xs: 12 }}>
          <Box
            sx={{
              backgroundImage: `url(${mainImage})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              width: '100%',
              height: '390px',
              borderRadius: '10px',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#f0f0f0',
            }}
          />
        </Grid>
        <Grid size={{ md: 6, sm: 12, xs: 12 }}>
          <Typography
            component={'h1'}
            sx={{
              lineHeight: '1',
              marginBottom: '10px',
            }}
            variant="sectionTitle"
          >
            {product.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Typography
              sx={{
                marginTop: '5px',
                fontSize: '1.2rem',
                fontWeight: '700',
                lineHeight: '1',
                textDecoration: myDiscount.names?.includes(product.sku)
                  ? 'line-through'
                  : 'none',
                textDecorationColor: 'black',
                textDecorationThickness: '2px',
                color: '#46A358',
              }}
            >
              {product.price}
            </Typography>
            <Typography
              sx={{
                marginTop: '5px',
                fontSize: '1.2rem',
                fontWeight: '700',
                lineHeight: '1',
                color: 'red',
              }}
            >
              {discount}
            </Typography>
          </Box>
          <Typography
            sx={{
              marginTop: '10px',
              marginBottom: '10px',
              fontSize: '1.2rem',
              fontWeight: '500',
            }}
          >
            Description:
          </Typography>
          <Typography
            sx={{
              fontSize: '1rem',
              fontWeight: '400',
              marginBottom: '30px',
              textWrap: 'wrap',
              lineHeight: '1.2',
            }}
          >
            {product.description['en-US']}
          </Typography>
          <Purchase purchases={0} />
        </Grid>
        <Grid
          size={{ md: 6, sm: 12, xs: 12 }}
          sx={{
            '@media (max-width: 900px)': {
              display: 'flex',
              justifyContent: 'center',
            },
          }}
        >
          <Slider images={imagesUrl} />
        </Grid>
        <Grid size={{ md: 6, sm: 12, xs: 12 }}>
          <AttributeBox attributes={attributes} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Details;
