import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import ResponseFormatter from '../CategoryResponse';
import CategoryItem from './CategoryItem';

const CategoryList = () => {
  const [categories] = useState(ResponseFormatter());

  return (
    <Paper
      // border="2px solid green"
      sx={{ p: 2 }}
    >
      <Typography component={'h2'} variant="cardTitle">
        Categories
      </Typography>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            // border: '3px solid wheat',
            fontSize: 13,
            gap: '0.5rem',
          }}
        >
          <CategoryItem name={'all'} slug={'all'} />
          {...categories.map(category => (
            <CategoryItem
              key={category.id}
              name={category.name}
              slug={category.slug}
            />
          ))}
        </Box>
      </Box>
    </Paper>
  );
};
export default CategoryList;
