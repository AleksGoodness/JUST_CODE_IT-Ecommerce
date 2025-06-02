import { yupResolver } from '@hookform/resolvers/yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, Grid, InputAdornment, TextField } from '@mui/material';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getCustomer } from '../../../../redux/selectors';
import { logOut } from '../../../../redux/slices/authSlice';
import { useUpdatePasswordMutation } from '../../../../services/api';
import CONSTANTS from '../../../../utils/CONSTANTS';
import passwordSchema from './passwordSchema';

const initState = { oldPassword: '', password: '', confirmPassword: '' };

const PasswordChanger = () => {
  const [updatePassword] = useUpdatePasswordMutation();
  const dispatch = useAppDispatch();
  const { customer, isLoading } = useAppSelector(getCustomer);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(passwordSchema),
    defaultValues: initState,
  });
  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  const submitHandle = async (data: typeof initState) => {
    console.log(data);

    try {
      const response = await updatePassword({
        id: customer?.id,
        version: customer?.version,
        currentPassword: data.oldPassword,
        newPassword: data.password,
      }).unwrap();

      if (response.id) {
        toast.success('password changed');
        toast.info('Please login with new password');
        dispatch(logOut());
        navigate(CONSTANTS.login);
      } else {
        toast.error('unknown error');
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'data' in error) {
        const apiError = error as {
          data: {
            message?: string;
            errors?: { code?: string; message?: string }[];
          };
        };

        const errorMessage = apiError.data.message || 'Password change failed';
        toast.error(errorMessage);
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };

  return (
    <Grid container direction={'column'} p={2} spacing={2}>
      <Button onClick={() => setIsOpen(!isOpen)}>Change password</Button>

      {isOpen ? (
        <Grid
          component={'form'}
          container
          onSubmit={handleSubmit(submitHandle)}
          spacing={2}
        >
          <Grid
            {...register('oldPassword')}
            component={TextField}
            disabled={isLoading}
            error={!!errors.oldPassword}
            helperText={errors.oldPassword?.message}
            label="Old Password"
            name="oldPassword"
            offset={{ lg: 2 }}
            size={{ xs: 8, lg: 6 }}
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

          <Grid alignItems={'baseline'} container size={{ xs: 4, lg: 2 }}>
            <Button
              disabled={isLoading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              save
            </Button>
          </Grid>
          <Grid
            {...register('password')}
            component={TextField}
            disabled={isLoading}
            error={!!errors.password}
            helperText={errors.password?.message}
            label="Password"
            name="password"
            offset={{ lg: 2 }}
            size={{ xs: 12, md: 6, lg: 4 }}
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
            disabled={isLoading}
            size={{ xs: 12, md: 6, lg: 4 }}
            {...register('confirmPassword')}
            component={TextField}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            label="Confirm Password"
            name="confirmPassword"
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
        </Grid>
      ) : null}
    </Grid>
  );
};

export default PasswordChanger;
