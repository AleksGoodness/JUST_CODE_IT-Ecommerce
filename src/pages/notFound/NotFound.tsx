import Home from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router';
import { Saver } from '../../components';

const NotFound = () => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        color: '#2F1829',
        borderRadius: '10px',
        maxWidth: '40vw',
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
            fontSize: 'clamp(0.5rem, 2.5vw, 2.5rem)',
            textAlign: 'center',
            color: theme.palette.action.active,
          })}
          variant="sectionTitle"
        >
          PAGE NOT FOUND
        </Typography>
        <Saver />
        <Link to="/">
          <Button variant="contained">
            <Home />
            home
          </Button>
        </Link>
      </>
    </Container>
  );
};

export default NotFound;
