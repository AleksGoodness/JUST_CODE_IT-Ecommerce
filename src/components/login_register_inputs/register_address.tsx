import { TextField } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export const RegisterAddress: FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      defaultValue=""
      name="address"
      render={({ field }) => (
        <TextField
          {...field}
          error={!!errors.email}
          label="Address"
          type="text"
          variant="outlined"
        />
      )}
    />
  );
};
