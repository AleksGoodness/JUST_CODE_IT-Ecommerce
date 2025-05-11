import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface FormInputProps {
  name: string;
  label: string;
  options?: string[];
  type?: string;
}

export const FormInput = ({
  name,
  label,
  options,
  type = 'text',
}: FormInputProps) => {
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
      defaultValue={name === 'dateOfBirth' ? null : ''}
      name={name}
      render={({ field }) =>
        name === 'dateOfBirth' ? (
          <Box>
            <Typography variant="h6">{label}</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                {...field}
                onChange={(date: dayjs.Dayjs | null) => {
                  field.onChange(date ? date.toDate() : null);
                }}
                slotProps={{
                  textField: {
                    variant: 'outlined',
                    fullWidth: true,
                    error: !!errors[name],
                    helperText: errors[name]?.message?.toString(),
                  },
                }}
                value={field.value instanceof Date ? dayjs(field.value) : null}
              />
            </LocalizationProvider>
          </Box>
        ) : options ? (
          <Autocomplete
            {...field}
            onChange={(_, value) => {
              field.onChange(value);
            }}
            options={options}
            renderInput={params => (
              <TextField
                {...params}
                error={!!errors[name]}
                helperText={errors[name]?.message?.toString()}
                label={label}
                variant="outlined"
              />
            )}
          />
        ) : (
          <TextField
            {...field}
            error={!!errors[name]}
            helperText={errors[name]?.message?.toString()}
            label={label}
            slotProps={
              name === 'password' || name === 'password_confirm'
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
            type={name === 'password' && !showPassword ? 'password' : type}
            variant="outlined"
          />
        )
      }
    />
  );
};
