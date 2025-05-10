import { Button, Container } from '@mui/material';
import { NavLink } from 'react-router';

export const Register = () => {
  return (
    <Container>
      <Button variant="contained">
        <NavLink to="/">Register</NavLink>
      </Button>
    </Container>
  );
};
