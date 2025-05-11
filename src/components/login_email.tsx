import TextField from '@mui/material/TextField';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export const LoginEmail: FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      defaultValue=""
      name="email"
      render={({ field }) => (
        <TextField
          {...field}
          error={!!errors.email}
          label="Email"
          type="email"
          variant="outlined"
        />
      )}
    />
  );
};
