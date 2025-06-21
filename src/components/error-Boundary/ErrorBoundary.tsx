import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router';

import CONSTANTS from '@/utils/CONSTANTS';

const ErrorBoundaryFallback = () => {
  return (
    <Container>
      <Typography>Something go wrong</Typography>
      <Button component={Link} to={CONSTANTS.home}>
        Go back
      </Button>
    </Container>
  );
};
export default ErrorBoundaryFallback;
