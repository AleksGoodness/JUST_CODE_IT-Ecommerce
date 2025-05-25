import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { NavLink, Outlet } from 'react-router';

const categoryArray = ['ficus, kaktus, rose, camomile'];

const CategoryList = () => {
  return (
    <Box border="2px solid green">
      <Typography component={'h2'} variant="cardTitle">
        Categories
      </Typography>
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <NavLink to={`ficus`}>ficus</NavLink>
          <NavLink to={`kaktus`}>kaktus</NavLink>
          <NavLink to={`rose`}>rose</NavLink>
          <NavLink to={`camomile`}>ромашка</NavLink>
        </Box>
      </Box>
      <Outlet />
    </Box>
  );
};
export default CategoryList;
