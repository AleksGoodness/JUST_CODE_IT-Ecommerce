import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Chip, Grid, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import Title from '../../components/title/Title';
import { ICustomerDetails } from '../../interfaces';
import Addresses from './Addresses';
import validatingSchema from './validating_schema';

interface IProps {
  customer: ICustomerDetails;
}

interface IInputProps {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
}

const AuthLayout = ({ customer }: IProps) => {
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

  const formSubmitHandler: SubmitHandler<IInputProps> = (data: IInputProps) => {
    console.log(data);
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
