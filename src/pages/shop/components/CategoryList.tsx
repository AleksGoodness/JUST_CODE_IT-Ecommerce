import CrossIcon from '@mui/icons-material/ClearRounded';
import { Box, List } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import CategoryItem from './CategoryItem';
import CategoryResponseFormatter from './CategoryResponse';

interface Props {
  toggleDrawer: (value: boolean) => void;
}

const CategoryList = ({ toggleDrawer }: Props) => {
  const [categories] = useState(CategoryResponseFormatter());

  return (
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
      <List sx={{ p: 2 }}>
        <Typography component={'h2'} variant="cardTitle">
          Categories
        </Typography>
        <CategoryItem name={'all'} slug={'all'} toggleDrawer={toggleDrawer} />
        {...categories.map(category => (
          <CategoryItem
            key={category.id}
            name={category.name}
            slug={category.slug}
            toggleDrawer={toggleDrawer}
          />
        ))}
      </List>
    </Box>
  );
};
export default CategoryList;
