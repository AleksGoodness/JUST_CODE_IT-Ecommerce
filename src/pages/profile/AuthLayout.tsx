import { Box, Button, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';

import { ICustomerDetails } from '../../interfaces';
import { IRegisterData } from '../../redux/interfaces';
import Addresses from './Addresses';

interface IProps {
  customer: ICustomerDetails;
}

const AuthLayout = ({ customer }: IProps) => {
  console.log(customer);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterData>({
    mode: 'onChange',
    defaultValues: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      dateOfBirth: customer.dateOfBirth,
    },
  });

  const onSubmit = () => {
    console.log('hi');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="First name"
          size="small"
          variant="outlined"
          {...register('firstName')}
        />
        <TextField
          label="Last name"
          size="small"
          variant="outlined"
          {...register('lastName')}
        />
        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field }) => (
            <DatePicker
              label="Date of Birth"
              onChange={field.onChange}
              slotProps={{
                textField: {
                  size: 'small',
                  error: !!errors.dateOfBirth,
                  helperText: errors.dateOfBirth?.message,
                },
              }}
              value={dayjs(field.value)}
            />
          )}
        />

        <Addresses addresses={customer.addresses} />

        <Button type="submit" variant="outlined">
          Save
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default AuthLayout;
