import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, ButtonGroup, Container, Typography } from '@mui/material';
import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router';
import {
  LoginEmail,
  LoginPassword,
  RegisterAddress,
  RegisterCity,
  RegisterConfirmPassword,
  RegisterCountry,
  RegisterDateBirth,
  RegisterFirstName,
  RegisterLastName,
  RegisterPostCode,
} from '../../components';
import schema from './register_schema';
import { IFormInputs } from './interfaces';

export const Register: FC = () => {
  const methods = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      shipping_address: {
        country: '',
        city: '',
        address: '',
        postcode: '',
      },
    },
  });

  console.log('shipping_address:', methods.watch('shipping_address'));
  console.log('Ошибки валидации:', methods.formState.errors);
  const formSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    console.log('form send');
    console.log('form data is', data);
  };

  return (
    <Container sx={{ width: 500, backgroundColor: '#FFFFFF' }}>
      <FormProvider {...methods}>
        <ButtonGroup variant="outlined">
          <Button>
            <NavLink to="/login">Login</NavLink>
          </Button>
          <Button>
            <NavLink to="/register">Register</NavLink>
          </Button>
        </ButtonGroup>
        <Typography>Enter your username and password to register</Typography>
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          <RegisterFirstName />
          <RegisterLastName />
          <LoginPassword />
          <RegisterConfirmPassword />
          <Box>
            <Typography>Shipping address</Typography>
            <RegisterCountry />
            <RegisterPostCode />
            <RegisterCity />
            <RegisterAddress />
          </Box>
          <Box>
            <Typography>Billing address</Typography>
            <RegisterCountry />
            <RegisterPostCode />
            <RegisterCity />
            <RegisterAddress />
          </Box>
          <LoginEmail />
          <RegisterDateBirth />
          <Button type="submit" variant="contained">
            Register
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
