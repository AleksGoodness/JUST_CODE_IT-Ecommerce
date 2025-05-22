import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';

import { AuthInput, Loading } from '../../components';
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
  const methods = useForm<IFormInputs>({
    mode: 'all',
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
    <Container>
      {isLoading ? <Loading /> : null}
      <Box
        sx={{
          maxWidth: '500px',
          width: '100%',
          transform: 'translateY(50%)',
          margin: '0 auto',
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
              sx={theme => ({
                fontSize: '1.2rem',
                '&.active': {
                  bgcolor: theme.palette.action.active,
                  color: theme.palette.primary.contrastText,
                },
              })}
              to="/login"
              variant="outlined"
            >
              Login
            </Button>
            <Button
              component={NavLink}
              sx={{ fontSize: '1.2rem' }}
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
            Enter your username and password to log in.
          </Typography>
          <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
            <Box
              sx={{
                display: 'grid',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <AuthInput label="Email" name="email" />
              <AuthInput label="Password" name="password" />
            </Box>
            <Button
              fullWidth
              sx={{ marginTop: '20px', height: '45px', fontSize: '1.2rem' }}
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </form>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default Login;
