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
import { useAppDispatch } from '../../redux/hooks';
import registerUser from '../../redux/slices/asyncThunks/asyncThunks';
import { countries, RegisterInputProps } from './interfaces';
import schema from './register_schema';

export const Register = () => {
  const dispatch = useAppDispatch();

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

  const formSubmitHandler: SubmitHandler<RegisterInputProps> = async data => {
    console.log(data);
    await dispatch(registerUser(data));
  };

  return (
    <Container>
      <Box
        sx={{
          display: 'grid',
          maxWidth: '500px',
          width: '100%',
          margin: '0 auto',
          paddingTop: '10%',
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
              name="shipping_address.country"
              options={countries}
            />

            <FormInput label="Address" name="shipping_address.address" />

            <FormInput label="City" name="shipping_address.city" />
            <FormInput label="Postcode" name="shipping_address.postcode" />

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
              name="billing_address.country"
              options={countries}
            />
            <FormInput label="Address" name="billing_address.address" />

            <FormInput label="City" name="billing_address.city" />
            <FormInput label="Postcode" name="billing_address.postcode" />
            <Typography
              component="h4"
              sx={{ gridColumn: 'span 2', textAlign: 'center' }}
              variant="cardTitle"
            >
              Your DOB and Email
            </Typography>
            <FormInput label="Email" name="email" type="email" />
            <FormInput label="Date of Birth" name="dateOfBirth" />

            <Button
              fullWidth
              sx={{
                gridColumn: 'span 2',
                maxWidth: 'fit-content',
                margin: '0 auto',
                marginBlock: '2rem',
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
