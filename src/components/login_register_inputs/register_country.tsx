import { Autocomplete, TextField } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const countries = [
  'Argentina',
  'Armenia',
  'Australia',
  'Azerbaijan',
  'Belarus',
  'Brazil',
  'Canada',
  'Chile',
  'China',
  'Colombia',
  'Cuba',
  'Egypt',
  'France',
  'Germany',
  'Greece',
  'India',
  'Indonesia',
  'Israel',
  'Italy',
  'Japan',
  'Kazakhstan',
  'Kenya',
  'Kyrgyzstan',
  'Malaysia',
  'Mexico',
  'Moldova',
  'Morocco',
  'Netherlands',
  'New Zealand',
  'Peru',
  'Philippines',
  'Portugal',
  'Russia',
  'Saudi Arabia',
  'Singapore',
  'South Africa',
  'South Korea',
  'Spain',
  'Switzerland',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Turkey',
  'Turkmenistan',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uzbekistan',
  'Vietnam',
];

export const RegisterCountry: FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue=""
      name="country"
      render={({ field }) => (
        <Autocomplete
          {...field}
          onChange={(_, value) => {
            field.onChange(value);
          }}
          options={countries}
          renderInput={params => (
            <TextField
              {...params}
              error={!!errors.country}
              label="Country"
              variant="outlined"
            />
          )}
        />
      )}
    />
  );
};
