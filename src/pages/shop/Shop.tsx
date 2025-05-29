import { Box, Container, Typography } from '@mui/material';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useParams } from 'react-router';

import CONSTANTS from '../../utils/CONSTANTS';
import CategoryList from './components/CategoryList';

const Shop = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  useEffect(() => {
    if (!category) navigate(`${CONSTANTS.shop}/all`);
  }, [category, navigate]);
  console.log(category);

  return (
    <Container
      animate={{ scale: 1 }}
      component={motion.div}
      initial={{ scale: 0 }}
    >
      <Box
        // border={'4px solid orange'}
        sx={{
          display: { xs: 'block', sm: 'grid' },
          gridTemplateColumns: '1fr 2.7fr',
        }}
      >
        <CategoryList />
        <Outlet />
      </Box>
    </Container>
  );
};
export default Shop;
