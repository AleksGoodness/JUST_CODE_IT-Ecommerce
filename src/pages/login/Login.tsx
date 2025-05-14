import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Container, Typography } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router';

import { AuthInput } from '../../components';
import schema from './login_schema';

interface IFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const methods = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const formSubmitHandler: SubmitHandler<IFormInputs> = data => {
    console.log('Form data:', data);
  };

  return (
    <Container>
      <Box
        sx={{
          maxWidth: '500px',
          width: '100%',
          transform: 'translateY(50%)',
          margin: '0 auto',
        }}
      >
        <FormProvider {...methods}>
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
              sx={{ fontSize: '1.2rem' }}
              to="/register"
              variant="outlined"
            >
              Register
            </Button>
          </Box>
          <Typography
            component="h3"
            sx={{ textAlign: 'center', paddingBlock: 3 }}
            variant="cardTitle"
          >
            Enter your username and password to log in.
          </Typography>
          <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
            <Box
              sx={{
                display: 'grid',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <AuthInput label="Email" name="email" />
              <AuthInput label="Password" name="password" />
            </Box>
            <Button
              fullWidth
              sx={{ marginTop: '20px', height: '45px', fontSize: '1.2rem' }}
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </form>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default Login;
