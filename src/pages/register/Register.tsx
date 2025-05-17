import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Checkbox, Container, Typography } from '@mui/material';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';
import { NavLink } from 'react-router';

import { FormInput } from '../../components';
import { countries, RegisterInputProps } from './interfaces';
import schema from './register_schema';

export const Register = () => {
  const methods = useForm<RegisterInputProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      addresses: [
        {
          country: '',
          streetName: '',
          city: '',
          postalCode: '',
        },
        {
          country: '',
          streetName: '',
          city: '',
          postalCode: '',
        },
      ],
      dateOfBirth: new Date().toString(),
      defaultBillingAddress: 0,
      defaultShippingAddress: 0,
      billingAddresses: [1],
      shippingAddresses: [1],
    },
  });

  const shippingAddress = useWatch({
    control: methods.control,
    name: 'addresses',
  })[0];

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      methods.setValue('addresses.1.country', shippingAddress.country);
      methods.setValue('addresses.1.streetName', shippingAddress.streetName);
      methods.setValue('addresses.1.city', shippingAddress.city);
      methods.setValue('addresses.1.postalCode', shippingAddress.postalCode);
    } else {
      methods.setValue('addresses.1.country', '');
      methods.setValue('addresses.1.streetName', '');
      methods.setValue('addresses.1.city', '');
      methods.setValue('addresses.1.postalCode', '');
    }
  };

  //console.log('Validation errors:', methods.formState.errors);
  const formSubmitHandler: SubmitHandler<RegisterInputProps> = data => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { password_confirm, ...newData } = data;
    console.log('Final Data:', newData);
    console.log(password_confirm);
  };

  return (
    <Container>
      <Box
        sx={{
          display: 'grid',
          maxWidth: '500px',
          width: '100%',
          margin: '0 auto',
          paddingTop: '5%',
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
              sx={{
                fontSize: '1.2rem',
              }}
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
          <Typography
            component="h3"
            sx={{ textAlign: 'center', paddingBlock: 3 }}
            variant="cardTitle"
          >
            Enter information to register
          </Typography>
          <form
            onSubmit={methods.handleSubmit(formSubmitHandler)}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.5rem',
            }}
          >
            <FormInput label="First Name" name="firstName" />
            <FormInput label="Last Name" name="lastName" />
            <FormInput label="Password" name="password" type="password" />
            <FormInput
              label="Confirm password"
              name="password_confirm"
              type="password"
            />
            <Typography
              component="h4"
              sx={{ gridColumn: 'span 2', textAlign: 'center' }}
              variant="cardTitle"
            >
              Shipping address
            </Typography>

            <FormInput
              label="Country"
              name="addresses.0.country"
              options={countries}
            />

            <FormInput label="Street" name="addresses.0.streetName" />

            <FormInput label="City" name="addresses.0.city" />
            <FormInput label="Postcode" name="addresses.0.postalCode" />

            <Box
              sx={{
                gridColumn: 'span 2',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography component="h4" variant="body2">
                Choose shipping address for billing address as well
              </Typography>
              <Checkbox onChange={handleCheckboxChange} />
            </Box>

            <Typography
              component="h4"
              sx={{ gridColumn: 'span 2', textAlign: 'center' }}
              variant="cardTitle"
            >
              Billing address
            </Typography>

            <FormInput
              label="Country"
              name="addresses.1.country"
              options={countries}
            />
            <FormInput label="Street" name="addresses.1.streetName" />

            <FormInput label="City" name="addresses.1.city" />
            <FormInput label="Postcode" name="addresses.1.postalCode" />

            <Typography
              component="h4"
              sx={{
                gridColumn: 'span 2',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
              variant="listTitle"
            >
              Enter your email and DOB
            </Typography>

            <FormInput label="Email" name="email" type="email" />
            <FormInput label="Date of Birth" name="dateOfBirth" />
            <Button
              fullWidth
              sx={{
                gridColumn: 'span 2',
                width: '100%',
                margin: '0 auto',
                marginBlock: '2rem',
                height: '45px',
                fontSize: '1.2rem',
              }}
              type="submit"
              variant="contained"
            >
              Register
            </Button>
          </form>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default Register;
