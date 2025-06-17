import BeeIcon from '@mui/icons-material/EmojiNature';
import { Box, Button, Grid, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useParams } from 'react-router';

import CategoryList from './components/CategoryList';
import Filters from './components/Filters';

const Shop = () => {
  const [open, setOpen] = useState(false);
  const { category } = useParams();
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    if (!category) navigate('all');
  }, [navigate, category]);
  return (
    <Box animate={{ scale: 1 }} component={motion.div} initial={{ scale: 0 }}>
      <Grid container justifyContent={'space-between'}>
        <Button
          endIcon={<BeeIcon />}
          onClick={toggleDrawer(true)}
          sx={{ maxWidth: 'fit-content' }}
          variant="outlined"
        >
          Categories
        </Button>
        <Grid component={Typography} variant="sectionTitle">
          {category ? category.replaceAll('-', ' ') : 'no category'}
        </Grid>
      </Grid>
      <Filters />
      <Drawer onClose={toggleDrawer(false)} open={open}>
        <CategoryList toggleDrawer={toggleDrawer(false)} />
      </Drawer>
      <Outlet />
    </Box>
  );
};
export default Shop;
