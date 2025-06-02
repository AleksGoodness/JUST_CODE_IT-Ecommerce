import BeeIcon from '@mui/icons-material/EmojiNature';
import { Box, Button, Container } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Outlet } from 'react-router';

import CategoryList from './components/CategoryList';

const Shop = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Container
      animate={{ scale: 1 }}
      component={motion.div}
      initial={{ scale: 0 }}
    >
      <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
        <Button
          endIcon={<BeeIcon />}
          onClick={toggleDrawer(true)}
          sx={{ maxWidth: 'fit-content' }}
          variant="outlined"
        >
          Categories
        </Button>

        <Drawer onClose={toggleDrawer(false)} open={open}>
          <CategoryList toggleDrawer={toggleDrawer(false)} />
        </Drawer>
        <Outlet />
      </Box>
    </Container>
  );
};
export default Shop;
