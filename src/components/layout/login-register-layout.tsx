import { Box, Button, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router';

const LoginRegisterLayout = () => {
  return (
    <>
      <Typography component={'h2'} variant="sectionTitle">
        Authentication
      </Typography>
      <Box
        sx={{
          display: 'grid',
          placeContent: 'center',
          gridTemplateColumns: 'repeat(auto-fit, minmax(auto, 150px))',
          gap: 5,
          paddingBottom: 2,
        }}
      >
        <Button
          component={NavLink}
          sx={theme => ({
            fontSize: '1.2rem',
            '&.active': {
              bgcolor: theme.palette.action.active,
              color: theme.palette.primary.contrastText,
            },
          })}
          to="/login"
          variant="outlined"
        >
          Login
        </Button>
        <Button
          component={NavLink}
          sx={theme => ({
            fontSize: '1.2rem',
            '&.active': {
              bgcolor: theme.palette.action.active,
              color: theme.palette.primary.contrastText,
            },
          })}
          to="/register"
          variant="outlined"
        >
          Register
        </Button>
      </Box>
      <Outlet />
    </>
  );
};

export default LoginRegisterLayout;
