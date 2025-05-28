import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import AttributeBox from '../../components/attributeBox/AttributeBox';
import Purchase from '../../components/purchase/Purchase';
import Slider from '../../components/slider/slider';
import { createClientWithToken } from '../../ecommerce/clientBuilder';
import CONSTANTS from '../../utils/CONSTANTS';
import clearDiscountObject from './clearDiscountObject';
import clearObject from './clearObject';
import discountObject from './dicountObject';
import tempObject from './tempObjext';
import { findDiscount, formatPrice } from './utilsDetails';
const projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY;

const Details = () => {
  const { category, plantName, plantId } = useParams();
  const navigate = useNavigate();
  const myProduct = clearObject(tempObject);
  const myDiscount = clearDiscountObject(discountObject);
  const discountPrice = findDiscount(myProduct.cost, myDiscount.value);
  const currency = myProduct.currency;
  const formattedDiscountPrice = formatPrice(currency, discountPrice);
  const discount = myDiscount.names?.includes(myProduct.sku)
    ? formattedDiscountPrice + '  Special Offer'
    : '';
  const slides = myProduct.images;
  const imagesUrl = slides.map(slide => slide.url);
  const mainImage = imagesUrl[0];
  const attributes = myProduct.attributes;
  useEffect(() => {
    if (!category && !plantId && !plantName) {
      navigate(CONSTANTS.shop);
      return;
    }
    if (!category) {
      navigate(CONSTANTS.shop);
      return;
    }

    if (!plantName || !plantId) {
      navigate(`${CONSTANTS.shop}/${category}`);
      return;
    }
    const client = createClientWithToken();
    (async () => {
      const response = await client.execute({
        uri: `/${projectKey}/products/${plantId}`,
        method: 'GET',
      });
      console.log(response);
    })();
  }, [plantId, navigate, plantName, category]);

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
        <Grid sx={{ maxWidth: '520px', width: '100%' }}>
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
        <Grid sx={{ maxWidth: '520px', width: '100%' }}>
          <Typography
            component={'h1'}
            sx={{
              lineHeight: '1',
              marginBottom: '10px',
            }}
            variant="sectionTitle"
          >
            {myProduct.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Typography
              sx={{
                marginTop: '5px',
                fontSize: '1.2rem',
                fontWeight: '700',
                lineHeight: '1',
                textDecoration: myDiscount.names?.includes(myProduct.sku)
                  ? 'line-through'
                  : 'none',
                textDecorationColor: 'black',
                textDecorationThickness: '2px',
                color: '#46A358',
              }}
            >
              {myProduct.price}
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
            {myProduct.description['en-US']}
          </Typography>
          <Purchase purchases={0} />
        </Grid>
        <Grid sx={{ maxWidth: '520px', width: '100%' }}>
          <Slider images={imagesUrl} />
        </Grid>
        <Grid sx={{ maxWidth: '520px', width: '100%' }}>
          <AttributeBox attributes={attributes} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Details;
