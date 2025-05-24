import { Container, Typography } from '@mui/material';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Slider } from '../../components/slider/slider';
import { createClientWithToken } from '../../ecommerce/clientBuilder';
import CONSTANTS from '../../utils/CONSTANTS';
import clearObject from './clearObject';
import { tempObject } from './tempObjext';
const projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY;

const Details = () => {
  const { category, plantName, plantId } = useParams();
  const navigate = useNavigate();
  const myProduct = clearObject(tempObject);
  const slides = myProduct.images;
  const imagesUrl = slides.map(slide => slide.url);

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
      <Typography component={'h1'} variant="mainTitle">
        {tempObject.masterData.current.name['en-US']}
      </Typography>
      <Slider images={imagesUrl} />
    </Container>
  );
};

export default Details;
