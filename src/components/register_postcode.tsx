import { TextField } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export const RegisterPostCode: FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      defaultValue=""
      name="postcode"
      render={({ field }) => (
        <TextField
          {...field}
          error={!!errors.postcode}
          label="Postode"
          type="text"
          variant="outlined"
        />
      )}
    />
  );
};
