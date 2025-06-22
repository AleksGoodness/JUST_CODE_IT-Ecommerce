import Box from '@mui/material/Box';
import { motion } from 'motion/react';

import Banner from './components/banner/banner';
const Home = () => {
  return (
    <Box
      animate={{ opacity: 1 }}
      component={motion.div}
      initial={{ opacity: 0 }}
    >
      <Banner />
    </Box>
  );
};
export default Home;
