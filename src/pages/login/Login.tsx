import { yupResolver } from '@hookform/resolvers/yup';
import { Button, ButtonGroup, Container, Typography } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router';

import schema from './login_schema';
import { LoginEmail, LoginPassword } from '../../components';

interface IFormInputs {
  email: string;
  password: string;
}

export const Login = () => {
  const methods = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  console.log('watch variable email', methods.watch('email'));
  const formSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    console.log('form data is', data);
  };

  return (
    <Container sx={{ width: 500, backgroundColor: '#FFFFFF' }}>
      <FormProvider {...methods}>
        <ButtonGroup variant="outlined">
          <Button>Login</Button>
          <Button>
            <NavLink to="/register">Register</NavLink>
          </Button>
        </ButtonGroup>
        <Typography>Enter your username and password to login.</Typography>
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          <LoginEmail />
          <LoginPassword />
          <Button type="submit" variant="contained">
            Register
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
