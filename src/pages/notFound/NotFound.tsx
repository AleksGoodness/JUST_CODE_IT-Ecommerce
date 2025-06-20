import Home from '@mui/icons-material/Home';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';
import { Link } from 'react-router';

import Saver from '@/components/saver/saver';

const NotFound = () => {
  return (
    <Box
      animate={{ opacity: 1 }}
      component={motion.div}
      initial={{ opacity: 0 }}
      sx={{
        color: '#2F1829',
        borderRadius: '10px',
        maxWidth: {
          xs: '70vw',
          sm: '60vw',
          md: '50vw',
          lg: '40vw',
        },
        aspectRatio: '1/1',
        display: 'grid',
        placeItems: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        margin: '0 auto',
      }}
    >
      <Typography
        sx={theme => ({
          fontSize: 'clamp(1rem, 2.5vw, 2.5rem)',
          textAlign: 'center',
          color: theme.palette.action.active,
        })}
        variant="sectionTitle"
      >
        PAGE NOT FOUND
      </Typography>
      <Saver />
      <Link to="/">
        <Button
          sx={{
            fontSize: 'clamp(0.9rem, 1.6vw, 1.3rem)',
          }}
          variant="contained"
        >
          <Home />
          home
        </Button>
      </Link>
    </Box>
  );
};
export default NotFound;
