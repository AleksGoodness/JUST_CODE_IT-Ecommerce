import CabinIcon from '@mui/icons-material/Cabin';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {
  Autocomplete,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  TextField,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export interface AddressFormValues {
  id?: string;
  country: string;
  streetName: string;
  city: string;
  postalCode: string;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
}
interface Props {
  defaultValue: AddressFormValues;
  formSubmitHandler: (data: AddressFormValues) => Promise<void>;
  handleDeleteAddress?: (id: string) => void;
}

const countries = ['Russia', 'Belarus'];

const AddressForm = ({
  defaultValue,
  formSubmitHandler,
  handleDeleteAddress,
}: Props) => {
  const {
    control,
    register,
    formState: { errors, isDirty },
    handleSubmit,
  } = useFormContext<AddressFormValues>();

  return (
    <Grid
      component="form"
      container
      direction="column"
      mt={1}
      onSubmit={handleSubmit(formSubmitHandler)}
      spacing={2}
    >
      <Divider />
      <Grid container justifyContent="end" spacing={2}>
        {handleDeleteAddress && defaultValue?.id ? (
          <Grid>
            <IconButton
              onClick={() => handleDeleteAddress(defaultValue.id || '')}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        ) : null}
        <Button disabled={!isDirty} type="submit" variant="contained">
          Save
        </Button>
      </Grid>
      <Grid container spacing={2}>
        <Grid
          alignItems={'center'}
          container
          justifyContent={'center'}
          size={12}
        >
          <Grid>
            <FormControlLabel
              control={
                <Switch
                  {...register('isDefaultShipping')}
                  checkedIcon={
                    <LocalShippingIcon
                      color="warning"
                      sx={{
                        mt: '-5px',
                      }}
                    />
                  }
                  icon={
                    <LocalShippingIcon
                      sx={{
                        mt: '-5px',
                      }}
                    />
                  }
                />
              }
              label="Default Shipping Address"
              labelPlacement="top"
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid>
            <FormControlLabel
              control={
                <Switch
                  {...register('isDefaultBilling')}
                  checkedIcon={
                    <CabinIcon
                      color="warning"
                      sx={{
                        mt: '-5px',
                      }}
                    />
                  }
                  icon={
                    <CabinIcon
                      sx={{
                        mt: '-5px',
                      }}
                    />
                  }
                />
              }
              label="Default Billing Address"
              labelPlacement="top"
              sx={{ width: '100%' }}
            />
          </Grid>
        </Grid>

        <Grid
          component={TextField}
          error={!!errors.streetName}
          helperText={errors.streetName?.message}
          label="StreetName"
          size={{ xs: 12, sm: 6, lg: 3 }}
          slotProps={{
            inputLabel: { shrink: true },
          }}
          variant="outlined"
          {...register('streetName')}
        />
        <Grid
          component={TextField}
          error={!!errors.city}
          helperText={errors.city?.message}
          label="City"
          size={{ xs: 12, sm: 6, lg: 3 }}
          slotProps={{
            inputLabel: { shrink: true },
          }}
          variant="outlined"
          {...register('city')}
        />
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Controller
            control={control}
            name="country"
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                onChange={(_, newValue) => onChange(newValue)}
                options={countries}
                renderInput={params => (
                  <TextField
                    {...params}
                    error={!!errors.country}
                    helperText={errors.country?.message}
                    label="Country"
                  />
                )}
                value={value}
              />
            )}
            rules={{ required: 'Country is required' }}
          />
        </Grid>
        <Grid
          component={TextField}
          error={!!errors.postalCode}
          helperText={errors.postalCode?.message}
          label="PostalCode"
          size={{ xs: 12, sm: 6, lg: 3 }}
          slotProps={{
            inputLabel: { shrink: true },
          }}
          variant="outlined"
          {...register('postalCode')}
        />
      </Grid>
    </Grid>
  );
};

export default AddressForm;
