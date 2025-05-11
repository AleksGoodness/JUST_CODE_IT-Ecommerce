import { yupResolver } from '@hookform/resolvers/yup';
import { Button, ButtonGroup, Container, Typography } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router';

import { AuthInput } from '../../components/login_register_inputs/auth_input';
import schema from './login_schema';

interface IFormInputs {
  email: string;
  password: string;
}

export const Login = () => {
  const methods = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const formSubmitHandler: SubmitHandler<IFormInputs> = data => {
    console.log('Form data:', data);
  };

  return (
    <Container sx={{ width: 500, backgroundColor: '#FFFFFF', padding: 3 }}>
      <FormProvider {...methods}>
        <ButtonGroup sx={{ marginBottom: 2 }} variant="outlined">
          <Button>
            <NavLink to="/login">Login</NavLink>
          </Button>
          <Button>
            <NavLink to="/register">Register</NavLink>
          </Button>
        </ButtonGroup>
        <Typography sx={{ marginBottom: 2 }}>
          Enter your username and password to log in.
        </Typography>
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          <AuthInput label="Email" name="email" />
          <AuthInput label="Password" name="password" />
          <Button
            fullWidth
            sx={{ marginTop: 2 }}
            type="submit"
            variant="contained"
          >
            Login
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
