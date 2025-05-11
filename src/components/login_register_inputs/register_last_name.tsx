import { TextField } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export const RegisterLastName: FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      defaultValue=""
      name="lastName"
      render={({ field }) => (
        <TextField
          {...field}
          error={!!errors.email}
          label="Last name"
          type="text"
          variant="outlined"
        />
      )}
    />
  );
};
