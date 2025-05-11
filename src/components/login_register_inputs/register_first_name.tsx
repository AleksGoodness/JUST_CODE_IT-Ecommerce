import { TextField } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export const RegisterFirstName: FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      defaultValue=""
      name="firstName"
      render={({ field }) => (
        <TextField
          {...field}
          error={!!errors.email}
          label="First name"
          type="text"
          variant="outlined"
        />
      )}
    />
  );
};
