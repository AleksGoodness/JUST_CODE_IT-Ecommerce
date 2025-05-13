import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';

import { ButtonLink } from '../../components';
import { FormInput } from '../../components/login_register_inputs/form_input';
import { RegisterInputProps } from './interfaces';
import { countries } from './interfaces';
import schema from './register_schema';

export const Register = () => {
  const methods = useForm<RegisterInputProps>({
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

  const shippingAddress = useWatch({
    control: methods.control,
    name: 'shipping_address',
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      methods.setValue('billing_address', shippingAddress);
    } else {
      methods.setValue('billing_address', {
        country: '',
        city: '',
        address: '',
        postcode: '',
      });
    }
  };

  console.log('Validation errors:', methods.formState.errors);
  const formSubmitHandler: SubmitHandler<RegisterInputProps> = data => {
    console.log('form send', data);
  };

  return (
    <Container>
      <Box
        sx={{
          maxWidth: '500',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '10%',
        }}
      >
        <FormProvider {...methods}>
          <ButtonGroup
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              marginBottom: '20px',
            }}
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
              marginBottom: '10px',
            }}
          >
            Enter information to register
          </Typography>
          <form
            onSubmit={methods.handleSubmit(formSubmitHandler)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
              <Box sx={{ flexGrow: 1 }}>
                <FormInput label="First Name" name="firstName" />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <FormInput label="Last Name" name="lastName" />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <FormInput label="Password" name="password" type="password" />
              <FormInput
                label="Confirm password"
                name="password_confirm"
                type="password"
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography sx={{ fontSize: '1rem', marginTop: '5px' }}>
                Shipping address
              </Typography>
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <FormInput
                    label="Country"
                    name="shipping_address.country"
                    options={countries}
                  />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <FormInput label="Address" name="shipping_address.address" />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <FormInput label="City" name="shipping_address.city" />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <FormInput
                    label="Postcode"
                    name="shipping_address.postcode"
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography sx={{ fontSize: '1rem' }}>
                  Choose shipping address for billing address as well
                </Typography>
                <Checkbox onChange={handleCheckboxChange} />
              </Box>
              <Typography sx={{ fontSize: '1rem' }}>Billing address</Typography>
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <FormInput
                    label="Country"
                    name="billing_address.country"
                    options={countries}
                  />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <FormInput label="Address" name="billing_address.address" />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <FormInput label="City" name="billing_address.city" />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <FormInput label="Postcode" name="billing_address.postcode" />
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
              <FormInput label="Email" name="email" type="email" />
              <FormInput label="Date of Birth" name="dateOfBirth" />
            </Box>

            <Button
              fullWidth
              sx={{ marginTop: '20px', height: '45px', fontSize: '1.2rem' }}
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
