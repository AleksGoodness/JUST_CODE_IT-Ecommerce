import { Visibility, VisibilityOff } from '@mui/icons-material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import {
  isValidShippingAddress,
  RegisterInputProps,
} from '../../pages/register/interfaces';

interface FormInputProps extends Partial<RegisterInputProps> {
  name: string;
  label: string;
  options?: string[];
  type?: string;
  sx?: object;
}

export const FormInput = ({ name, label, options }: FormInputProps) => {
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
  return (
    <Box>
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
              sx={{
                width: '100%',
                '& .MuiInputBase-root': { height: '40px' },
              }}
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
              fullWidth
              sx={{ width: '100%', '& .MuiInputBase-root': { height: '40px' } }}
              error={!!errors[name]}
              helperText={errors[name]?.message?.toString()}
              label={label}
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
    </Box>
  );
};
