import { Box, Container, Typography } from '@mui/material';
import { motion } from 'motion/react';
import { NavLink, Outlet } from 'react-router';

const Shop = () => {
  return (
    <Container
      animate={{ scale: 1 }}
      component={motion.div}
      initial={{ scale: 0 }}
    >
      <Box sx={{ display: 'flex' }}>
        <Typography component={'h2'} variant="sectionTitle">
          shop
        </Typography>
        <Box>
          categories
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <NavLink to={`ficus`}>ficus</NavLink>
            <NavLink to={`kaktus`}>kaktus</NavLink>
            <NavLink to={`rose`}>rose</NavLink>
            <NavLink to={`camomile`}>ромашка</NavLink>
          </Box>
        </Box>
        <Outlet />
      </Box>
    </Container>
  );
};
export default Shop;
