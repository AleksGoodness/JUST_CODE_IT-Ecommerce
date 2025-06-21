import BeeIcon from '@mui/icons-material/EmojiNature';
import { Box, Button, Grid, Typography } from '@mui/material';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useParams } from 'react-router';

import CategoryList from './components/category-list/CategoryList';
import Filters from './components/filters/Filters';

const Shop = () => {
  const { category, plantName } = useParams();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (v: boolean) => () => {
    setIsOpen(v);
  };
  useEffect(() => {
    if (!category) navigate('all');
  }, [navigate, category]);
  return (
    <Box
      animate={{ opacity: 1 }}
      component={motion.div}
      initial={{ opacity: 0 }}
    >
      {!plantName ? (
        <>
          <Grid
            alignItems={'center'}
            container
            gap={2}
            justifyContent={'space-between'}
          >
            <Button
              endIcon={<BeeIcon />}
              onClick={toggleDrawer(true)}
              sx={{ maxWidth: 'fit-content' }}
              variant="outlined"
            >
              Categories
            </Button>
            <Grid
              component={Typography}
              fontSize={{ xs: '1rem', sm: '1.6', md: '1.8rem' }}
              variant="sectionTitle"
            >
              {category ? category.replaceAll('-', ' ') : 'no category'}
            </Grid>
          </Grid>
          <Filters />

          <CategoryList isOpen={isOpen} toggleDrawer={toggleDrawer(false)} />
        </>
      ) : null}
      <Outlet />
    </Box>
  );
};
export default Shop;
