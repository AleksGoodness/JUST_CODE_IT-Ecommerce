import { Button, Grid, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router';

const LoginRegisterLayout = () => {
  return (
    <>
      <Typography component={'h2'} variant="sectionTitle">
        Authentication
      </Typography>
      <Grid container spacing={2} sx={{ maxWidth: 400, mx: 'auto' }}>
        <Button
          component={NavLink}
          sx={{
            flex: 1,

            '&.active': {
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              boxShadow: 2,
              border: 'none',
            },
          }}
          to="/login"
          variant="outlined"
        >
          Login
        </Button>

        <Button
          component={NavLink}
          sx={{
            flex: 1,
            '&.active': {
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              boxShadow: 2,
              border: 'none',
            },
          }}
          to="/register"
          variant="outlined"
        >
          Register
        </Button>
      </Grid>
      <Outlet />
    </>
  );
};

export default LoginRegisterLayout;
