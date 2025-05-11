import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router';
import * as yup from 'yup';

import { RegisterDateBirth } from '../../components/date_birth';
import { LoginEmail } from '../../components/login_email';
import { LoginPassword } from '../../components/login_password';
import { RegisterAddress } from '../../components/register_address';
import { RegisterCity } from '../../components/register_city';
import { RegisterConfirmPassword } from '../../components/register_confirm_password';
import { RegisterCountry } from '../../components/register_country';
import { RegisterFirstName } from '../../components/register_first_name';
import { RegisterLastName } from '../../components/register_last_name';
import { RegisterPostCode } from '../../components/register_postcode';

interface ShippingAddress {
  country: string;
  city: string;
  address: string;
  postcode: string;
}

interface BillingAddress {
  country?: string;
  city?: string;
  address?: string;
  postcode?: string;
}

interface IFormInputs {
  firstName: string;
  lastName: string;
  password: string;
  password_confirm: string;
  shipping_address: ShippingAddress;
  billing_address: BillingAddress;
  email: string;
  dateOfBirth: Date;
}

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup
    .string()
    .required('Please enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Character',
    ),
  password_confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Required'),
  shipping_address: yup
    .object()
    .shape({
      country: yup.string().required(),
      city: yup.string().required(),
      address: yup.string().required(),
      postcode: yup.string().required(),
    })
    .required(),
  billing_address: yup
    .object()
    .shape({
      country: yup.string().optional(),
      city: yup.string().optional(),
      address: yup.string().optional(),
      postcode: yup.string().optional(),
    })
    .required(),

  email: yup.string().email().required(),
  dateOfBirth: yup
    .date()
    .min(new Date(1900, 0, 1))
    .required(),
});

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
