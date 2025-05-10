import DarkMode from '@mui/icons-material/DarkMode';
import East from '@mui/icons-material/East';
import LightMode from '@mui/icons-material/LightMode';
import Login from '@mui/icons-material/Login';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';

import { ButtonLink } from '../../components/index.ts';
import { Saver } from '../../components/saver/saver.tsx';
import { AppThemeContext } from '../../theme/AppThemeContext.tsx';

export const Preview = () => {
  const { toggleTheme, isDarkMode } = useContext(AppThemeContext);

  return (
    <Container>
      <Box sx={{ p: 1, m: 1, border: '1px solid black' }}>
        <Typography align="center" variant="h3">
          Titles
        </Typography>
        <Typography />

        <Typography
          component="p"
          sx={{
            textAlign: 'right',
            backgroundColor: '#red',
          }}
          variant="secondTitle"
        >
          Some text
        </Typography>

        <Typography component="h1" variant="mainTitle">
          Let’s Make a Better
          <Typography
            sx={theme => ({
              color: theme.palette.action.active,
            })}
            variant="mainTitle"
          >
            Planet
          </Typography>
        </Typography>
        <Typography component="h2" variant="sectionTitle">
          Our Blog Posts
        </Typography>

        <Typography component="h3" variant="cardTitle">
          Cactus & Succulent Care Tips
        </Typography>

        <Typography component="h4" variant="listTitle">
          Categories
        </Typography>
      </Box>

      <Box sx={{ p: 1, m: 1, border: '1px solid black' }}>
        <Typography align="center" variant="h3">
          Buttons
        </Typography>
        <Button variant="pagination">1</Button>
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
      </Box>

      <Box sx={{ p: 1, m: 1, border: '1px solid black' }}>
        <Typography align="center" variant="h3">
          text
        </Typography>

        <Typography>
          We are an online plant shop offering a wide range of cheap and trendy
          plants. Use our plants to create an unique Urban Jungle. Order your
          favorite plants!
        </Typography>
        <Typography variant="body2">
          We are an online plant shop offering a wide range of cheap and trendy
          plants. Use our plants to create an unique Urban Jungle. Order your
          favorite plants!
        </Typography>
      </Box>
      <Box>
        <Saver />
      </Box>
    </Container>
  );
};
