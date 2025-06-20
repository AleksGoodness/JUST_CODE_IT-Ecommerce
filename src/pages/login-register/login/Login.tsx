import { yupResolver } from '@hookform/resolvers/yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import Loading from '@/components/loading/Loading';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCustomer } from '@/redux/selectors';
import loginCustomer from '@/redux/slices/asyncThunks/loginCustomer';
import { ECartUpdateActions } from '@/services/interfaces/updateCart.interface';

import {
  useGetActiveCartQuery,
  useUpdateCartMutation,
} from '../../../services/api';
import CONSTANTS from '../../../utils/CONSTANTS';
import schema from './login_schema';

interface IFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: cart, refetch: refetchCart } = useGetActiveCartQuery({});
  const [mergeCart] = useUpdateCartMutation();

  const { isLoading, customer } = useAppSelector(getCustomer);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (customer) {
      navigate(CONSTANTS.home);
    }
  }, [customer, navigate]);

  const formSubmitHandler: SubmitHandler<IFormInputs> = async data => {
    if (isLoading) return;
    try {
      const anonymousCartId = cart?.anonymousId;
      const itemsToMerge = anonymousCartId ? cart.lineItems : [];

      await dispatch(loginCustomer(data)).unwrap();

      const newCart = await refetchCart().unwrap();

      if (!newCart) {
        throw new Error('Failed to fetch user cart');
      }

      if (itemsToMerge.length > 0) {
        await mergeCart({
          cartId: newCart.id,
          actionBody: {
            version: newCart.version,
            actions: [
              ...itemsToMerge.map(item => ({
                action: ECartUpdateActions.addNewProduct,
                productId: item.productId,
                variantId: item.variant.id,
                quantity: item.quantity,
              })),
            ],
          },
        }).unwrap();
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error)
        toast.error('Failed to merge carts. Please try again.');
    }
  };

  return (
    <Box
      animate={{ opacity: 1 }}
      component={motion.div}
      initial={{ opacity: 0 }}
    >
      {isLoading ? <Loading /> : null}

      <Typography
        component="h3"
        sx={{ textAlign: 'center', paddingBlock: 3 }}
        variant="cardTitle"
      >
        Enter your username and password to log in.
      </Typography>
      <Grid
        component={'form'}
        container
        direction={'column'}
        onSubmit={handleSubmit(formSubmitHandler)}
        spacing={2}
        sx={{ maxWidth: 500, mx: 'auto' }}
      >
        <Grid
          {...register('email')}
          component={TextField}
          error={!!errors.email}
          helperText={errors.email?.message}
          label="Email"
          name="email"
          size={12}
        />
        <Grid
          {...register('password')}
          component={TextField}
          error={!!errors.password}
          helperText={errors.password?.message}
          label="Password"
          name="password"
          size={12}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          type={!showPassword ? 'password' : 'text'}
        />

        <Grid
          alignSelf={'center'}
          component={Button}
          size={4}
          type="submit"
          variant="contained"
        >
          Login
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
