import DarkMode from '@mui/icons-material/DarkMode';
import East from '@mui/icons-material/East';
import LightMode from '@mui/icons-material/LightMode';
import Login from '@mui/icons-material/Login';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { ButtonLink, Saver } from '../../components/index.ts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { getThemeName } from '../../redux/selectors.ts';
import { checkAuth } from '../../redux/slices/asyncThunks/checkAuth.ts';
import { setTheme } from '../../redux/slices/themeSlice.ts';

const Preview = () => {
  const theme = useAppSelector(getThemeName);

  const dispatch = useAppDispatch();

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
          main
          <Typography
            sx={theme => ({
              color: theme.palette.action.active,
            })}
            variant="mainTitle"
          >
            Title
          </Typography>
        </Typography>
        <Typography component="h2" variant="sectionTitle">
          sectionTitle
        </Typography>

        <Typography component="h3" variant="cardTitle">
          cardTitle
        </Typography>

        <Typography component="h4" variant="listTitle">
          Categories
        </Typography>
      </Box>

      <Box sx={{ p: 1, m: 1, border: '1px solid black' }}>
        <Typography align="center" variant="h3">
          Buttons
        </Typography>
        <Button variant="pagination">pagination</Button>
        <Button sx={{ bgcolor: 'red' }} variant="contained">
          getProjectDetails
        </Button>
        <ButtonLink
          startIcon={<Login sx={{ marginRight: 0.5 }} />}
          to="/"
          variant="contained"
        >
          contained
        </ButtonLink>
        <ButtonLink
          sx={{ textTransform: 'uppercase' }}
          to="/"
          variant="contained"
        >
          Shop Now
        </ButtonLink>

        <Button variant="contained">Filter</Button>
        <Button
          onClick={() => {
            dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
          }}
          variant="contained"
        >
          {theme === 'light' ? <LightMode /> : <DarkMode />}
          Change Theme
        </Button>

        <ButtonLink endIcon={<East />} to="/" variant="contained">
          Find more
        </ButtonLink>
        <Button onClick={() => dispatch(checkAuth())}>check auth</Button>
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
          body2 - Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Adipisci eveniet, ratione tenetur debitis at similique sapiente magni
          placeat natus consequatur architecto, saepe necessitatibus rerum
        </Typography>
      </Box>
      <Box>
        <Saver />
      </Box>
    </Container>
  );
};

export default Preview;
