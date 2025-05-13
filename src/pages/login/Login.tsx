import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, ButtonGroup, Container, Typography } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { AuthInput, ButtonLink } from '../../components';
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
          <ButtonGroup
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              marginBottom: '50px',
            }}
            variant="outlined"
          >
            <ButtonLink sx={{ fontSize: '1.2rem' }} to="/login">
              Login
            </ButtonLink>
            <ButtonLink sx={{ fontSize: '1.2rem' }} to="/register">
              Register
            </ButtonLink>
          </ButtonGroup>
          <Typography
            sx={{
              fontSize: '1.2rem',
              textAlign: 'center',
              marginBottom: '15px',
            }}
          >
            Enter your username and password to log in.
          </Typography>
          <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
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
