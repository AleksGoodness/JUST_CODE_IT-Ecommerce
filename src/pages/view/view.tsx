import { DarkMode, East, LightMode, Login } from '@mui/icons-material';
import { Button, ButtonGroup, Container } from '@mui/material';
import { useContext } from 'react';

import { AppThemeContext } from '../../theme/AppThemeContext.tsx';

export const View = () => {
  const { toggleTheme, isDarkMode } = useContext(AppThemeContext);

  return (
    <Container>
      <ButtonGroup sx={{ display: 'flex', gap: 1, padding: 1 }}>
        <Button
          startIcon={<Login sx={{ marginRight: 0.5 }} />}
          variant="contained"
        >
          Login
        </Button>
        <Button sx={{ textTransform: 'uppercase' }} variant="contained">
          Shop Now
        </Button>
        <Button endIcon={<East sx={{ marginLeft: 0.5 }} />} variant="contained">
          Find more
        </Button>
        <Button variant="contained">Filter</Button>
        <Button onClick={toggleTheme} variant="contained">
          {isDarkMode ? <DarkMode /> : <LightMode />}
          Change Theme
        </Button>
      </ButtonGroup>
    </Container>
  );
};
