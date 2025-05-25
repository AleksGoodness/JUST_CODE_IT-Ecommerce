import { Box, Container, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';

import CategoryList from '../../components/categoryList/CategoryList';

const Shop = () => {
  return (
    <Container>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 2.7fr',
          border: '3px solid orange',
        }}
      >
        <CategoryList />
      </Box>
    </Container>
  );
};
export default Shop;
