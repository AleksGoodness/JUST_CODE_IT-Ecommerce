import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { passwordErrors } from '../../pages/register/interfaces';

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

  const password: string = useWatch({ control, name: 'password' });
  const remainingErrors = passwordErrors.filter(
    (error: { test: RegExp }) => !error.test.test(password),
  );

  const [showHints, setShowHints] = useState(false);
  const handleFocus = () => {
    setShowHints(true);
  };
  const handleBlur = () => {
    setShowHints(false);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <TextField
            {...field}
            error={!!errors[name]}
            helperText={errors[name]?.message?.toString()}
            label={label}
            size="small"
            onFocus={handleFocus}
            onBlur={handleBlur}
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
            type={name === 'password' && !showPassword ? 'password' : 'text'}
            variant="outlined"
          />
          {name === 'password' && showHints && remainingErrors.length > 0 && (
            <Box sx={{ fontSize: '0.9rem', marginTop: '4px' }}>
              {remainingErrors.map((error, index) => (
                <Typography key={index} color="error">
                  {error.message}
                </Typography>
              ))}
            </Box>
          )}
        </>
      )}
    />
  );
};
export default AuthInput;
