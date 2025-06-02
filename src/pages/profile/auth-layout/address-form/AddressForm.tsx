import { yupResolver } from '@hookform/resolvers/yup';
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
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useAppDispatch } from '../../../../redux/hooks';
import { setCustomer } from '../../../../redux/slices/authSlice';
import { useUpdateProfileMutation } from '../../../../services/api';
import schema from './schema';
const countries = ['Russia', 'Belarus'];

export interface InputProps {
  id: string;
  country: string;
  streetName: string;
  city: string;
  postalCode: string;
  isDefaultShippingAddress: boolean;
  isDefaultBillingAddress: boolean;
}

interface Props {
  addressToEdit: InputProps;
  version: number;
}

const defaultValues = {
  country: '',
  streetName: '',
  city: '',
  postalCode: '',
  isDefaultShipping: false,
  isDefaultBilling: false,
};

const AddressForm = ({ addressToEdit, version }: Props) => {
  const [updateProfile] = useUpdateProfileMutation();
  const dispatch = useAppDispatch();

  const handleDeleteAddress = (id: string) => {
    if (!version) return;
    updateProfile({
      version: version,

      actions: [
        {
          action: 'removeAddress',
          addressId: `${id}`,
        },
      ],
    })
      .unwrap()
      .then(response => dispatch(setCustomer(response)));
    toast.success('address deleted');
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<typeof defaultValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: addressToEdit,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (addressToEdit) {
        reset({
          ...addressToEdit,
          country: addressToEdit.country === 'RU' ? 'Russia' : 'Belarus',
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [addressToEdit, reset]);

  const formSubmitHandler = async (data: typeof defaultValues) => {
    const request = await updateProfile({
      version: version,
      actions: [
        {
          action: 'changeAddress',
          addressId: addressToEdit?.id,
          address: {
            country: data.country === 'Russia' ? 'RU' : 'BY',
            streetName: data.streetName,
            city: data.city,
            postalCode: data.postalCode,
          },
        },
      ],
    });

    if (request.data) {
      toast.success('address updated');
      reset(defaultValues);
      dispatch(setCustomer(request.data));
    }
    if (request.error) {
      console.log(request.error);
      toast.error('something go wrong');
    }
  };

  return (
    <Grid
      component={'form'}
      container
      direction={'column'}
      mt={1}
      onSubmit={handleSubmit(formSubmitHandler)}
      spacing={2}
    >
      <Divider />
      <Grid container justifyContent={'end'} spacing={2}>
        {addressToEdit ? (
          <Grid>
            <IconButton onClick={() => handleDeleteAddress(addressToEdit.id)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        ) : null}
        <Button type="submit" variant="contained">
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
                  checkedIcon={<LocalShippingIcon />}
                  icon={<LocalShippingIcon />}
                  sx={{
                    '& .MuiSwitch-switchBase': {
                      '&.Mui-checked': {
                        '& .MuiSwitch-thumb': {
                          color: 'GrayText',
                        },
                      },
                    },
                  }}
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
                  checkedIcon={<CabinIcon />}
                  icon={<CabinIcon />}
                  sx={{
                    '& .MuiSwitch-switchBase': {
                      '&.Mui-checked': {
                        '& .MuiSwitch-thumb': {
                          color: 'GrayText',
                        },
                      },
                    },
                  }}
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
