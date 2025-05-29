import BeeIcon from '@mui/icons-material/EmojiNature';
import { Box, Breadcrumbs, Button, Container, Link } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { useParams } from 'react-router';

import CONSTANTS from '../../utils/CONSTANTS';
import CategoryList from './components/CategoryList';

const Shop = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const navigate = useNavigate();
  const { category } = useParams();
  useEffect(() => {
    if (!category) navigate(`${CONSTANTS.shop}/all`);
  }, [category, navigate]);

  return (
    <Container
      animate={{ scale: 1 }}
      component={motion.div}
      initial={{ scale: 0 }}
    >
      <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
        <Breadcrumbs>
          <Link
            color="inherit"
            component={NavLink}
            to="/"
            underline="hover"
            variant="subtitle2"
          >
            Home
          </Link>
          <Link
            color="inherit"
            component={NavLink}
            to="/shop"
            underline="hover"
            variant="subtitle2"
          >
            Shop
          </Link>
          <Link
            color="inherit"
            component={NavLink}
            to={`/shop/${category}`}
            underline="hover"
            variant="subtitle2"
          >
            {category}
          </Link>
        </Breadcrumbs>
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
