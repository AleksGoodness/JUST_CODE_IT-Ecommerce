import { Container, Typography } from '@mui/material';
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
