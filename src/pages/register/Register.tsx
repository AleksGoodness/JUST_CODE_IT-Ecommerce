import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, ButtonGroup, Container, Typography } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router';

import { FormInput } from '../../components/login_register_inputs/form_input';
import { FormInputProps } from './interfaces';
import { countries } from './interfaces';
import schema from './register_schema';

export const Register = () => {
  const methods = useForm<FormInputProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      password: '',
      password_confirm: '',
      email: '',
      dateOfBirth: new Date(),
      shipping_address: {
        country: '',
        city: '',
        address: '',
        postcode: '',
      },
      billing_address: {
        country: '',
        city: '',
        address: '',
        postcode: '',
      },
    },
  });

  console.log('Ошибки валидации:', methods.formState.errors);

  const formSubmitHandler: SubmitHandler<FormInputProps> = data => {
    console.log('form send', data);
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
          <FormInput label="First Name" name="firstName" />
          <FormInput label="Last Name" name="lastName" />
          <FormInput label="Password" name="password" type="password" />
          <FormInput
            label="Confirm Password"
            name="password_confirm"
            type="password"
          />

          <Box>
            <Typography>Shipping address</Typography>
            <FormInput
              label="Country"
              name="shipping_address.country"
              options={countries}
            />
            <FormInput label="Postcode" name="shipping_address.postcode" />
            <FormInput label="City" name="shipping_address.city" />
            <FormInput label="Address" name="shipping_address.address" />
          </Box>

          <Box>
            <Typography>Billing address</Typography>
            <FormInput
              label="Country"
              name="shipping_address.country"
              options={countries}
            />
            <FormInput label="Postcode" name="billing_address.postcode" />
            <FormInput label="City" name="billing_address.city" />
            <FormInput label="Address" name="billing_address.address" />
          </Box>

          <FormInput label="Email" name="email" type="email" />
          <FormInput label="Date of Birth" name="dateOfBirth" />

          <Button type="submit" variant="contained">
            Register
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
