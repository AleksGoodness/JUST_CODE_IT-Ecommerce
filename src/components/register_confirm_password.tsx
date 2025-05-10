import { TextField } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export const RegisterConfirmPassword: FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue=""
      name="password_confirm"
      render={({ field }) => (
        <TextField
          {...field}
          error={!!errors.password_confirm}
          helperText={
            errors.password_confirm
              ? errors.password_confirm.message?.toString()
              : ''
          }
          label="Confirm password"
          type="password"
          variant="outlined"
        />
      )}
    />
  );
};
