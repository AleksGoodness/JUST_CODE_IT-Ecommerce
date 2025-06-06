import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import AttributeBox from '../../components/attributeBox/AttributeBox';
import Purchase from '../../components/purchase/Purchase';
import Slider from '../../components/slider/slider';
import { useGetProductQuery } from '../../services/api';
import CONSTANTS from '../../utils/CONSTANTS';
import clearObject, { ProductDetails } from './clearObject';
import Placeholder from './defaultimg/default.jpg';

const Details = () => {
  const { category, plantName } = useParams();
  const { data } = useGetProductQuery(`/${plantName}`);
  const navigate = useNavigate();

  const [myProduct, setProduct] = useState<null | ProductDetails>(null);

  useEffect(() => {
    if (data) {
      const clearResponse = clearObject(data);
      setProduct(clearResponse);
    }
  }, [data]);

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
  }, [navigate, plantName, category]);

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
              backgroundImage: `url(${myProduct?.images[0].url || Placeholder})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              width: '100%',
              height: '24.5rem',
              borderRadius: '10px',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#f0f0f0',
            }}
          />
        </Grid>
        <Grid size={{ md: 6, sm: 12, xs: 12 }}>
          {myProduct ? (
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
          ) : (
            <Skeleton />
          )}
          {myProduct ? (
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <Typography
                sx={{
                  marginTop: '5px',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  lineHeight: '1',
                  textDecoration: myProduct.discount ? 'line-through' : 'none',
                  textDecorationColor: 'red',
                  textDecorationThickness: '2px',
                  color: 'primary.main',
                }}
              >
                {myProduct.price}
              </Typography>
              {myProduct.discount ? (
                <Typography
                  sx={{
                    marginTop: '5px',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    lineHeight: '1',
                    color: 'red',
                  }}
                >
                  {(myProduct.discount / 100).toFixed(2)} {myProduct.currency}{' '}
                  Special Offer
                </Typography>
              ) : null}
            </Box>
          ) : (
            <Skeleton />
          )}

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
          {myProduct ? (
            <Typography
              sx={{
                fontSize: '1rem',
                marginBottom: '30px',
                textWrap: 'wrap',
                lineHeight: '1.2',
              }}
            >
              {myProduct.description['en-US']}
            </Typography>
          ) : (
            <Skeleton />
          )}
          <Purchase purchases={1} product={myProduct} />
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
          {myProduct ? (
            <Slider images={myProduct.images.map(pic => pic.url)} />
          ) : (
            <Skeleton />
          )}
        </Grid>
        <Grid size={{ md: 6, sm: 12, xs: 12 }}>
          {myProduct ? (
            <AttributeBox attributes={myProduct.attributes} />
          ) : (
            Array.from({ length: 7 }).map((_, i) => <Skeleton key={i} />)
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Details;
