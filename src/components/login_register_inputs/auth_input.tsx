import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface AuthInputProps {
  name: 'email' | 'password';
  label: string;
}

const AuthInput = ({ name, label }: AuthInputProps) => {
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
      name={name}
      render={({ field }) => (
        <TextField
          sx={{
            width: '100%',
            '& .MuiInputBase-root': { height: '40px' },
          }}
          {...field}
          error={!!errors[name]}
          helperText={errors[name]?.message?.toString()}
          label={label}
          slotProps={
            name === 'password'
              ? {
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" onClick={handleTogglePassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }
              : undefined
          }
          type={name === 'password' && !showPassword ? 'password' : 'email'}
          variant="outlined"
        />
      )}
    />
  );
};

export default AuthInput;
