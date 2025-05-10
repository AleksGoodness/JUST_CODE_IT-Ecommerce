import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export const Home = () => {
  return (
    <Container>
      <Typography align="center" variant="h1">
        Hello JustCodeIt team
      </Typography>
      <Typography sx={{ color: 'green', textAlign: 'center' }}>
        This is example of usage Material UI
      </Typography>
    </Container>
  );
};
