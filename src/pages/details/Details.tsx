import { Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { createClientWithToken } from '../../ecommerce/clientBuilder';
import CONSTANTS from '../../utils/CONSTANTS';
const projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY;

const Details = () => {
  const { category, plantName, plantId } = useParams();
  const navigate = useNavigate();

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
    <Container>
      <Typography component={'h1'} variant="mainTitle">
        {plantName}
      </Typography>
    </Container>
  );
};

export default Details;
