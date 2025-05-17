import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Autocomplete,
  Box,
  Checkbox,
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
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import {
  isValidShippingAddress,
  passwordErrors,
  RegisterInputProps,
} from '../../pages/register/interfaces';

interface FormInputProps extends Partial<RegisterInputProps> {
  name: string;
  label: string;
  options?: string[];
  type?: string;
}

const FormInput = ({ name, label, options, ...props }: FormInputProps) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const shippingAddress: unknown = useWatch({
    control,
    name: 'shipping_address',
    defaultValue: { country: '', city: '', address: '', postcode: '' },
  });

  const [isShowPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (isValidShippingAddress(shippingAddress)) {
      if (event.target.checked) {
        setValue('billing_address', shippingAddress);
      } else {
        setValue('billing_address', {
          country: '',
          city: '',
          address: '',
          postcode: '',
        });
      }
    }
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
    <Box {...props}>
      {name === 'billing_address' ? (
        <Box>
          <Checkbox
            checked={checked}
            onChange={handleCheckboxChange}
            slotProps={{ input: { 'aria-label': 'controlled' } }}
          />
          <Typography>
            Choose shipping address for billing address as well
          </Typography>
        </Box>
      ) : null}

      <Controller
        control={control}
        defaultValue={name === 'dateOfBirth' ? null : ''}
        name={name}
        render={({ field }) =>
          name === 'dateOfBirth' ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                {...field}
                onChange={(date: dayjs.Dayjs | null) => {
                  field.onChange(date ? date.toDate() : null);
                }}
                slotProps={{
                  textField: {
                    variant: 'outlined',
                    size: 'small',
                    fullWidth: true,
                    error: !!errors[name],
                    helperText: errors[name]?.message?.toString(),
                  },
                }}
                value={field.value instanceof Date ? dayjs(field.value) : null}
              />
            </LocalizationProvider>
          ) : options ? (
            <Autocomplete
              fullWidth
              size="small"
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
              fullWidth
              helperText={errors[name]?.message?.toString()}
              label={label}
              onBlur={handleBlur}
              onFocus={handleFocus}
              size="small"
              slotProps={
                name === 'password' || name === 'password_confirm'
                  ? {
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={handleTogglePassword}
                            >
                              {isShowPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }
                  : undefined
              }
              sx={{ width: '100%', '& .MuiInputBase-root': { height: '40px' } }}
              type={
                (name === 'password' || name === 'password_confirm') &&
                !isShowPassword
                  ? 'password'
                  : 'text'
              }
              variant="outlined"
            />
          )
        }
      />

      {name === 'password' && showHints && remainingErrors.length > 0 ? (
        <Box sx={{ fontSize: '0.9rem', marginTop: '4px' }}>
          {remainingErrors.map((error, index) => (
            <Typography color="error" key={index}>
              {error.message}
            </Typography>
          ))}
        </Box>
      ) : null}
    </Box>
  );
};

export default FormInput;
