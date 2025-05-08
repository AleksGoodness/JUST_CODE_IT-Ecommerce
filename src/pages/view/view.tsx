import { DarkMode, East, LightMode, Login } from '@mui/icons-material';
import { Button, Container } from '@mui/material';
import { useContext } from 'react';

import ButtonLink from '../../components/buttonLink/ButtonLink.tsx';
import { AppThemeContext } from '../../theme/AppThemeContext.tsx';

export const View = () => {
  const { toggleTheme, isDarkMode } = useContext(AppThemeContext);

  return (
    <Container>
      <ButtonLink
        startIcon={<Login sx={{ marginRight: 0.5 }} />}
        to="/"
        variant="contained"
      >
        Login
      </ButtonLink>
      <ButtonLink
        sx={{ textTransform: 'uppercase' }}
        to="/"
        variant="contained"
      >
        Shop Now
      </ButtonLink>

      <Button variant="contained">Filter</Button>
      <Button onClick={toggleTheme} variant="contained">
        {isDarkMode ? <DarkMode /> : <LightMode />}
        Change Theme
      </Button>

      <ButtonLink endIcon={<East />} to="/" variant="contained">
        Find more
      </ButtonLink>
    </Container>
  );
};
