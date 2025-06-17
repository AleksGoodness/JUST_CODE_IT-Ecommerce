import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';
import { ChangeEvent, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { FormInput, Loading } from '../../components';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IRegisterData } from '../../redux/interfaces';
import { getCustomer } from '../../redux/selectors';
import registerUser from '../../redux/slices/asyncThunks/registerCustomer';
import CONSTANTS from '../../utils/CONSTANTS';
import { countries, RegisterInputProps } from './interfaces';
import schema from './register_schema';

const initialAddress = {
  country: '',
  streetName: '',
  city: '',
  postalCode: '',
};

export const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, customer } = useAppSelector(getCustomer);

  useEffect(() => {
    if (customer) navigate(CONSTANTS.home);
  }, [customer, navigate]);

  const methods = useForm<RegisterInputProps>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      password_confirm: '',
      billingAddress: initialAddress,
      shippingAddress: initialAddress,
      dateOfBirth: new Date(),
      defaultBillingAddress: 0,
      defaultShippingAddress: 0,
      billingAddresses: [1],
      shippingAddresses: [1],
    },
  });

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const shippingAddress = methods.getValues('shippingAddress');
    if (event.target.checked) {
      methods.setValue('billingAddress.country', shippingAddress.country);
      methods.setValue('billingAddress.streetName', shippingAddress.streetName);
      methods.setValue('billingAddress.city', shippingAddress.city);
      methods.setValue('billingAddress.postalCode', shippingAddress.postalCode);
      methods.setValue('billingAddresses', [0]);
    } else {
      methods.setValue('billingAddress.country', '');
      methods.setValue('billingAddress.streetName', '');
      methods.setValue('billingAddress.city', '');
      methods.setValue('billingAddress.postalCode', '');
      methods.setValue('billingAddresses', [1]);
    }
  };
  const handleBillingCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    methods.setValue('defaultBillingAddress', event.target.checked ? 1 : 0);
  };

  const handleShippingCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    methods.setValue('defaultShippingAddress', event.target.checked ? 1 : 0);
  };

  //console.log('Validation errors:', methods.formState.errors);
  const formSubmitHandler: SubmitHandler<RegisterInputProps> = async data => {
    const {
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      billingAddress,
      shippingAddress,
      defaultBillingAddress,
      defaultShippingAddress,
      billingAddresses,
      shippingAddresses,
    } = data;
    const ISOAddresses = [shippingAddress, billingAddress].map(address => {
      return {
        ...address,
        country: countries[address.country],
      };
    });
    const properObject: IRegisterData = {
      firstName,
      lastName,
      email,
      password,
      dateOfBirth: new Date(dateOfBirth).toISOString().split('T')[0],
      addresses: ISOAddresses,
      defaultBillingAddress,
      defaultShippingAddress,
      billingAddresses,
      shippingAddresses,
    };
    await dispatch(registerUser(properObject));
  };

  return (
    <Box animate={{ scale: 1 }} component={motion.div} initial={{ scale: 0 }}>
      {isLoading ? <Loading /> : null}
      <Box
        sx={{
          display: 'grid',
          maxWidth: '500px',
          width: '100%',
          margin: '0 auto',
          paddingTop: '2%',
        }}
      >
        <FormProvider {...methods}>
          <Typography
            component="h3"
            sx={{ textAlign: 'center', paddingBlock: 3 }}
            variant="cardTitle"
          >
            Fill in your details to create an account
          </Typography>
          <Box
            component={'form'}
            onSubmit={methods.handleSubmit(formSubmitHandler)}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
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
              sx={{ gridColumn: { sm: 'span 2' }, textAlign: 'center' }}
              variant="listTitle"
            >
              Shipping address
            </Typography>
            <Box>
              <FormInput
                label="Country"
                name="shippingAddress.country"
                options={Object.keys(countries)}
              />
              <Typography color="error" sx={{ fontSize: '0.8rem' }}>
                {methods.formState.errors.shippingAddress?.country?.message}
              </Typography>
            </Box>
            <Box>
              <FormInput label="Street" name="shippingAddress.streetName" />
              <Typography color="error" sx={{ fontSize: '0.8rem' }}>
                {methods.formState.errors.shippingAddress?.streetName?.message}
              </Typography>
            </Box>
            <Box>
              <FormInput label="City" name="shippingAddress.city" />
              <Typography color="error" sx={{ fontSize: '0.8rem' }}>
                {methods.formState.errors.shippingAddress?.city?.message}
              </Typography>
            </Box>
            <Box>
              <FormInput label="Postcode" name="shippingAddress.postalCode" />
              <Typography color="error" sx={{ fontSize: '0.8rem' }}>
                {methods.formState.errors.shippingAddress?.postalCode?.message}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography component="h4" variant="body2">
                Set shipping address as default
              </Typography>
              <Checkbox
                checked={methods.watch('defaultShippingAddress') === 1}
                onChange={handleShippingCheckboxChange}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography component="h4" variant="body2">
                Use the same address for shipping and billing
              </Typography>
              <Checkbox onChange={handleCheckboxChange} />
            </Box>

            <Typography
              component="h4"
              sx={{ gridColumn: { sm: 'span 2' }, textAlign: 'center' }}
              variant="listTitle"
            >
              Billing address
            </Typography>
            <Box>
              <FormInput
                label="Country"
                name="billingAddress.country"
                options={Object.keys(countries)}
              />
              <Typography color="error" sx={{ fontSize: '0.8rem' }}>
                {methods.formState.errors.billingAddress?.country?.message}
              </Typography>
            </Box>
            <Box>
              <FormInput label="Street" name="billingAddress.streetName" />
              <Typography color="error" sx={{ fontSize: '0.8rem' }}>
                {methods.formState.errors.billingAddress?.streetName?.message}
              </Typography>
            </Box>
            <Box>
              <FormInput label="City" name="billingAddress.city" />
              <Typography color="error" sx={{ fontSize: '0.8rem' }}>
                {methods.formState.errors.billingAddress?.city?.message}
              </Typography>
            </Box>
            <Box>
              <FormInput label="Postcode" name="billingAddress.postalCode" />
              <Typography color="error" sx={{ fontSize: '0.8rem' }}>
                {methods.formState.errors.billingAddress?.postalCode?.message}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography component="h4" variant="body2">
                Set billing address as default
              </Typography>
              <Checkbox
                checked={methods.watch('defaultBillingAddress') === 1}
                onChange={handleBillingCheckboxChange}
              />
            </Box>

            <Typography
              component="h4"
              sx={{
                gridColumn: { sm: 'span 2' },
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
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default Register;
