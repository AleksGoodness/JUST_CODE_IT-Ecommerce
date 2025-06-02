import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Home = () => {
  return (
    <Container disableGutters sx={{ padding: '26px 0' }}>
      <Typography
        component="h1"
        sx={{ textAlign: 'center' }}
        variant="mainTitle"
      >
        Hello JustCodeIt team
      </Typography>
      <Typography sx={{ color: 'green', textAlign: 'center' }}>
        This is example of usage Material UI
      </Typography>
    </Container>
  );
};
export default Home;
