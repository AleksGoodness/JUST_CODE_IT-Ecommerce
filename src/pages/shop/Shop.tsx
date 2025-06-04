import BeeIcon from '@mui/icons-material/EmojiNature';
import { Box, Button, Container } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useParams } from 'react-router';

import { useGetCategoriesQuery } from '../../services/api';
import CategoryList from './components/CategoryList';
import CategoryResponseFormatter from './components/CategoryResponse';

const Shop = () => {
  const { data } = useGetCategoriesQuery({});
  const [open, setOpen] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState<string>();
  const { category } = useParams();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    if (category) {
      if (typeof data === 'object' && data !== null && 'results' in data) {
        const categories = CategoryResponseFormatter(data);
        const current = categories.find(cat => cat.slug === category);
        if (current) setCurrentCategoryId(current.id);
      }
    }
  }, [category, data]);

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
          <CategoryList
            setCurrentCategoryId={setCurrentCategoryId}
            toggleDrawer={toggleDrawer(false)}
          />
        </Drawer>
        <Outlet context={currentCategoryId} />
      </Box>
    </Container>
  );
};
export default Shop;
