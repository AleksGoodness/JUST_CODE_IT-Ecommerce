import BeeIcon from '@mui/icons-material/EmojiNature';
import { Box, Button } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';

import Filter from '../../components/filterSorterSearcher/filter/Filter';
import Searcher from '../../components/filterSorterSearcher/searcher/Searcher';
import Sorter from '../../components/filterSorterSearcher/sorter/Sorter';
import { useGetCategoriesQuery } from '../../services/api';
import CategoryList from './components/CategoryList';
import CategoryResponseFormatter from './components/CategoryResponse';

const Shop = () => {
  const { data } = useGetCategoriesQuery({});
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
      return;
    }
    navigate('all');
  }, [category, data, navigate]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          width: '100%',
          px: 0,
        }}
      >
        <Button
          endIcon={<BeeIcon />}
          onClick={toggleDrawer(true)}
          sx={{ maxWidth: 'fit-content' }}
          variant="outlined"
        >
          Categories
        </Button>

        <Filter />
        <Sorter />
        <Searcher />
        <Button
          onClick={() => {
            navigate({ search: undefined, pathname: '/shop/all' });
          }}
        >
          resetFilters
        </Button>
      </Box>
      <Box animate={{ scale: 1 }} component={motion.div} initial={{ scale: 0 }}>
        <Box>
          <Drawer onClose={toggleDrawer(false)} open={open}>
            <CategoryList
              setCurrentCategoryId={setCurrentCategoryId}
              toggleDrawer={toggleDrawer(false)}
            />
          </Drawer>
          <Outlet context={currentCategoryId} />
        </Box>
      </Box>
    </>
  );
};
export default Shop;
