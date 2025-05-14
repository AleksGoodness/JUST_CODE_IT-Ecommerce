import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import Navigation from '../navigation/Navigation';
import Cart from './Cart';
import LogoLogin from './LogoLogin';
import LogoMain from './LogoMain';
import Magnifier from './Magnifier';

const Header = () => {
  return (
    <Container
      component="header"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        alignItems: 'center',
      }}
    >
      <LogoMain />
      <Navigation />
      <Stack alignItems="center" direction="row" display="flex" spacing={4}>
        <Box
          sx={{
            width: { xs: '10px', sm: '14px', md: '20px' },
            height: 'auto',
            flexShrink: 0,
          }}
        >
          <Magnifier />
        </Box>
        <Box
          sx={{
            width: { xs: '11px', sm: '15px', md: '22px' },
            height: 'auto',
            flexShrink: 0,
          }}
        >
          <Cart />
        </Box>

        <Button
          sx={{
            maxWidth: '100px',
            width: '100%',
            display: 'flex',
            alignItams: 'center',
            gap: '6px',
            padding: { xs: '2px 4px', sm: '3px 6px', md: '4px 8px' },
            fontSize: 'clamp(0.5rem, 1.6vw, 0.9rem)',
          }}
          variant="contained"
        >
          <LogoLogin />
          Login
        </Button>
      </Stack>
    </Container>
  );
};
export default Header;
