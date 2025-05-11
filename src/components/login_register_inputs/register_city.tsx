import { TextField } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export const RegisterCity: FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      defaultValue=""
      name="city"
      render={({ field }) => (
        <TextField
          {...field}
          error={!!errors.email}
          label="City"
          type="text"
          variant="outlined"
        />
      )}
    />
  );
};
