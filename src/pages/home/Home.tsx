import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router';

const Home = () => {
  return (
    <Container disableGutters sx={{ padding: '26px 0' }}>
      <Typography align="center" variant="h2">
        Hello JustCodeIt team
      </Typography>
      <Typography sx={{ color: 'green', textAlign: 'center' }}>
        This is example of usage Material UI
      </Typography>
      <NavLink to="/login">Login</NavLink>
    </Container>
  );
};
export default Home;
