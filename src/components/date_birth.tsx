import { Box, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export const RegisterDateBirth: FC = () => {
  const { control } = useFormContext(); // Получаем доступ к управлению формой

  return (
    <Box>
      <Typography variant="h6">Date of your birth</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          control={control}
          defaultValue={null}
          name="dateOfBirth"
          render={({ field }) => (
            <DatePicker
              {...field}
              onChange={(date: dayjs.Dayjs | null) => {
                field.onChange(date ? date.toDate() : null);
              }}
              slotProps={{
                textField: {
                  variant: 'outlined',
                  fullWidth: true,
                },
              }}
              value={field.value instanceof Date ? dayjs(field.value) : null}
            />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
};
