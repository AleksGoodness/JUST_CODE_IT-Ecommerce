import './login.module.scss';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, ButtonGroup, Container, Typography } from '@mui/material';
import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router';
import * as yup from 'yup';

import { LoginEmail } from '../../components/login_email';
import { LoginPassword } from '../../components/login_password';

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(10).required(),
});

export const Login: FC = () => {
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
