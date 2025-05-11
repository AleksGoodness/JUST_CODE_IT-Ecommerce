import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { FC, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export const RegisterConfirmPassword: FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <Controller
      control={control}
      defaultValue=""
      name="password_confirm"
      render={({ field }) => (
        <TextField
          {...field}
          error={!!errors.password_confirm}
          fullWidth
          helperText={
            errors.password_confirm
              ? errors.password_confirm.message?.toString()
              : ''
          }
          label="Confirm password"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={handleTogglePassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
        />
      )}
    />
  );
};
