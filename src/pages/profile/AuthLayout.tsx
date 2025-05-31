import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Chip, Grid, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Title } from '../../components';
import { ICustomerDetails } from '../../interfaces';
import { useAppDispatch } from '../../redux/hooks';
import { setCustomer } from '../../redux/slices/authSlice';
import { useUpdateProfileMutation } from '../../services/api';
import Addresses from './Addresses';
import validatingSchema from './validating_schema';

interface Props {
  customer: ICustomerDetails;
}

interface IInputProps {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
}

const AuthLayout = ({ customer }: Props) => {
  const [updateProfile] = useUpdateProfileMutation();
  const dispatch = useAppDispatch();

  const {
    register,
    control,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<IInputProps>({
    mode: 'onChange',
    resolver: yupResolver(validatingSchema),
    defaultValues: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      dateOfBirth: dayjs(customer.dateOfBirth).toDate(),
    },
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const formSubmitHandler: SubmitHandler<IInputProps> = async (
    data: IInputProps,
  ) => {
    const actions = [];

    try {
      if (data.firstName !== customer.firstName) {
        actions.push({
          action: 'setFirstName',
          firstName: data.firstName,
        });
      }
      if (data.lastName !== customer.lastName) {
        actions.push({
          action: 'setLastName',
          lastName: data.lastName,
        });
      }

      if (data.dateOfBirth !== dayjs(customer.dateOfBirth).toDate()) {
        actions.push({
          action: 'setDateOfBirth',
          dateOfBirth: data.dateOfBirth.toISOString().split('T')[0],
        });
      }

      await updateProfile({
        version: customer.version,
        actions,
      })
        .unwrap()
        .then(response => dispatch(setCustomer(response)));
      toast.success('profile updated');
      setIsEditMode(false);
    } catch (error) {
      console.log(error);
      toast.error('some error');

      reset();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Chip
        label={isEditMode ? 'Edit mode' : 'View mode'}
        sx={{ bgcolor: isEditMode ? 'primary.main' : 'disabled', m: 4 }}
      />
      <Grid
        component={'form'}
        container
        onSubmit={handleSubmit(formSubmitHandler)}
        spacing={2}
      >
        <Grid
          component={TextField}
          disabled={!isEditMode}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          label="First name"
          size={{ xs: 12, sm: 6, lg: 4 }}
          variant="outlined"
          {...register('firstName')}
        />
        <Grid
          component={TextField}
          disabled={!isEditMode}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          label="Last name"
          size={{ xs: 12, sm: 6, lg: 4 }}
          variant="outlined"
          {...register('lastName')}
        />
        <Grid size={{ xs: 12, lg: 4 }}>
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field }) => (
              <DatePicker
                disabled={!isEditMode}
                label="Date of Birth"
                onChange={field.onChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.dateOfBirth,
                    helperText: errors.dateOfBirth?.message,
                  },
                }}
                value={dayjs(field.value)}
              />
            )}
          />
        </Grid>

        <Grid component={Title} size={12} variant="section">
          Addresses
        </Grid>
        <Grid
          addresses={customer.addresses}
          component={Addresses}
          defaultBillingAddressId={customer.defaultBillingAddressId}
          defaultShippingAddressId={customer.defaultShippingAddressId}
          isEditMode={isEditMode}
          size={12}
        />

        <Grid size={12}>
          <Button disabled={!isEditMode} type="submit" variant="outlined">
            Save
          </Button>
          <Button
            onClick={() => {
              setIsEditMode(!isEditMode);
            }}
            variant={isEditMode ? 'contained' : 'outlined'}
          >
            Edit
          </Button>
          <Button
            disabled={!isEditMode}
            onClick={() => {
              reset();
            }}
            variant="outlined"
          >
            reset
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default AuthLayout;
