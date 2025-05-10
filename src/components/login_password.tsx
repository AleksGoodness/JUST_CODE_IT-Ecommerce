import { TextField } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
//import VisibilityIcon from '@mui/icons-material/Visibility';
//import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const LoginPassword: FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      defaultValue=""
      name="password"
      render={({ field }) => (
        <TextField
          {...field}
          error={!!errors.password}
          helperText={
            errors.password ? errors.password.message?.toString() : ''
          }
          label="Password"
          type="password"
          variant="outlined"
        />
      )}
    />
  );
};
