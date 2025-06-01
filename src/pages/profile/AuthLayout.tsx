import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { ICustomerDetails } from '../../interfaces';
import { useAppDispatch } from '../../redux/hooks';
import { setCustomer } from '../../redux/slices/authSlice';
import { useUpdateProfileMutation } from '../../services/api';
import AddressForm, { InputProps } from './address-form/AddressForm';
import Addresses from './Addresses';
import validatingSchema from './validating_schema';

interface Props {
  customer: ICustomerDetails;
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
}

interface IInputProps {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
}

const AuthLayout = ({ customer, isEditMode, setIsEditMode }: Props) => {
  const [updateProfile] = useUpdateProfileMutation();
  const dispatch = useAppDispatch();
  const [editAddress, setEditAddress] = useState<InputProps>();

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,

    formState: { errors },
  } = useForm<IInputProps>({
    mode: 'onChange',
    resolver: yupResolver(validatingSchema),
    defaultValues: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      dateOfBirth: dayjs(customer.dateOfBirth).toDate(),
    },
  });

  const formSubmitHandler: SubmitHandler<IInputProps> = async (
    data: IInputProps,
  ) => {
    const actions = [
      data.firstName !== customer.firstName && {
        action: 'setFirstName',
        firstName: data.firstName,
      },
      data.lastName !== customer.lastName && {
        action: 'setLastName',
        lastName: data.lastName,
      },
      dayjs(data.dateOfBirth).format('YYYY-MM-DD') !==
        dayjs(customer.dateOfBirth).format('YYYY-MM-DD') && {
        action: 'setDateOfBirth',
        dateOfBirth: dayjs(data.dateOfBirth).format('YYYY-MM-DD'),
      },
      data.email !== customer.email && {
        action: 'changeEmail',
        email: data.email,
      },
    ].filter(Boolean);

    if (!actions.length) {
      toast.info('nothing changed');
      setIsEditMode(false);
      return;
    }

    try {
      const response = await updateProfile({
        version: customer.version,
        actions,
      }).unwrap();

      dispatch(setCustomer(response));
      toast.success('Profile updated');
      setIsEditMode(false);
    } catch (error) {
      if (error && typeof error === 'object' && 'data' in error) {
        const apiError = error as {
          status: number;
          data: {
            message: string;
            errors?: {
              code: string;
              message: string;
              field?: string;
            }[];
          };
        };

        if (apiError.data.errors) {
          apiError.data.errors.forEach(err => {
            if (err.field) {
              setError(err.field as keyof IInputProps, {
                type: 'manual',
                message: err.message,
              });
            }
          });
        } else {
          toast.error(apiError.data.message || 'An error occurred');
        }
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const handleDeleteAddress = (id: string) => {
    updateProfile({
      version: customer.version,

      actions: [
        {
          action: 'removeAddress',
          addressId: `${id}`,
        },
      ],
    })
      .unwrap()
      .then(response => dispatch(setCustomer(response)));
    toast.success('address deleted');
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid
          component={'form'}
          container
          onSubmit={handleSubmit(formSubmitHandler)}
          spacing={2}
        >
          <Grid container justifyContent={'end'} size={12} spacing={1}>
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
          <Grid
            component={TextField}
            disabled={!isEditMode}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            label="First name"
            size={{ xs: 12, sm: 6, lg: 3 }}
            variant="outlined"
            {...register('firstName')}
          />
          <Grid
            component={TextField}
            disabled={!isEditMode}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            label="Last name"
            size={{ xs: 12, sm: 6, lg: 3 }}
            variant="outlined"
            {...register('lastName')}
          />
          <Grid
            component={TextField}
            disabled={!isEditMode}
            error={!!errors.email}
            helperText={errors.email?.message}
            label="Email"
            size={{ xs: 12, sm: 6, lg: 3 }}
            variant="outlined"
            {...register('email')}
          />
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
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
        </Grid>
      </LocalizationProvider>

      <Grid
        addresses={customer.addresses}
        component={Addresses}
        defaultBillingAddressId={customer.defaultBillingAddressId}
        defaultShippingAddressId={customer.defaultShippingAddressId}
        handleDeleteAddress={handleDeleteAddress}
        isEditMode={isEditMode}
        setEditAddress={setEditAddress}
        size={12}
      />

      <AddressForm
        addressToEdit={editAddress}
        setEditAddress={setEditAddress}
        version={customer.version}
      />
    </>
  );
};

export default AuthLayout;
