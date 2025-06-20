import CrossIcon from '@mui/icons-material/ClearRounded';
import { Box, Drawer, List, Skeleton } from '@mui/material';
import { motion } from 'motion/react';
import { useLocation } from 'react-router';

import Title from '@/components/title/Title';
import { useGetCategoriesQuery } from '@/services/api';

import CategoryResponseFormatter from '../../utils/CategoryResponse';
import CategoryItem from '../category-item/CategoryItem';

interface Props {
  toggleDrawer: (value: boolean) => void;
  isOpen: boolean;
}

const CategoryList = ({ toggleDrawer, isOpen }: Props) => {
  const { data } = useGetCategoriesQuery({});
  const location = useLocation();

  return (
    <Drawer onClose={() => toggleDrawer(false)} open={isOpen}>
      <Box sx={{ width: { sm: '45vw', md: '35vw', lg: '25vw' } }}>
        <CrossIcon
          onClick={() => toggleDrawer(false)}
          sx={{
            position: 'absolute',
            right: '1rem',
            top: '1rem',
            fontSize: 30,
            display: 'flex',
            cursor: 'pointer',
            color: 'primary.main',
            zIndex: '1',
          }}
        />
        <Title component={'h2'} sx={{ p: 2 }} variant="section">
          Categories
        </Title>
        <List sx={{ p: 2 }}>
          {data ? (
            <>
              <CategoryItem
                name={'all'}
                slug={'all' + location.search}
                toggleDrawer={toggleDrawer}
              />
              {CategoryResponseFormatter(data).map(category => (
                <CategoryItem
                  key={category.id}
                  name={category.name}
                  slug={category.slug + location.search}
                  toggleDrawer={toggleDrawer}
                />
              ))}
            </>
          ) : (
            <>
              {[...Array(5)].map((_, index) => (
                <Skeleton
                  animate={{ opacity: 1 }}
                  component={motion.svg}
                  height={48}
                  initial={{ opacity: 0 }}
                  key={index}
                  sx={{ mb: 1, borderRadius: 1 }}
                  variant="rounded"
                  width="100%"
                />
              ))}
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
export default CategoryList;
