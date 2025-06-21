import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';
const Home = () => {
  return (
    <Box
      animate={{ opacity: 1 }}
      component={motion.div}
      initial={{ opacity: 0 }}
    >
      <Typography
        component="h1"
        sx={{ textAlign: 'center' }}
        variant="mainTitle"
      >
        Hello JustCodeIt team
      </Typography>
      <Typography sx={{ color: 'primary.main', textAlign: 'center' }}>
        This is example of usage Material UI
      </Typography>
      <Grid direction={'column'}>
        <Typography variant="sectionTitle">Promo code</Typography>
        <Typography color="primary.main" fontSize="1.5rem" fontWeight="bold">
          greenery_promo
        </Typography>
      </Grid>
    </Box>
  );
};
export default Home;
