import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router';

import ResponseFormatter from '../CategoryResponse';

const CategoryList = () => {
  const [categories] = useState(ResponseFormatter());

  return (
    <Box border="2px solid green">
      <Typography component={'h2'} variant="cardTitle">
        Categories
      </Typography>
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Link component={NavLink} to={'all'} variant="navLink">
            all
          </Link>
          {...categories.map(category => {
            return (
              <Link
                component={NavLink}
                key={category.id}
                to={category.slug}
                variant="navLink"
              >
                {category.name}
              </Link>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
export default CategoryList;
