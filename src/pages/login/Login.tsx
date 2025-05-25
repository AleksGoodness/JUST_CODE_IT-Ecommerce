import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { Loading } from '../../components';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getCustomer } from '../../redux/selectors';
import loginCustomer from '../../redux/slices/asyncThunks/loginCustomer';
import CONSTANTS from '../../utils/CONSTANTS';
import schema from './login_schema';

interface IFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, customer } = useAppSelector(getCustomer);
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
    if (!isLoading) {
      await dispatch(loginCustomer(data));
    }
  };

  return (
    <Container
      animate={{ scale: 1 }}
      component={motion.div}
      initial={{ scale: 0 }}
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
    </Container>
  );
};

export default Login;
