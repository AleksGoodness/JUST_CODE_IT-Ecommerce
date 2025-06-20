import Home from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';
import { Link } from 'react-router';

import Saver from '../../components/saver/saver';

const NotFound = () => {
  return (
    <Container
      animate={{ scale: 1 }}
      component={motion.div}
      disableGutters
      initial={{ scale: 0 }}
      maxWidth={false}
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
      }}
    >
      <>
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
      </>
    </Container>
  );
};
export default NotFound;
