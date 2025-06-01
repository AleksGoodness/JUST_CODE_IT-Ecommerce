import { yupResolver } from '@hookform/resolvers/yup';
import SendIcon from '@mui/icons-material/Send';
import {
  Autocomplete,
  Divider,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Title } from '../../../components';
import { useAppDispatch } from '../../../redux/hooks';
import { setCustomer } from '../../../redux/slices/authSlice';
import { useUpdateProfileMutation } from '../../../services/api';
import schema from './schema';

export interface InputProps {
  id?: string;
  country: string;
  streetName: string;
  city: string;
  postalCode: string;
}

interface Props {
  addressToEdit?: InputProps;
  version?: number;
  setEditAddress: (value: undefined) => void;
}

const defaultValues: InputProps = {
  country: '',
  streetName: '',
  city: '',
  postalCode: '',
};

const AddressForm = ({ addressToEdit, version, setEditAddress }: Props) => {
  const [updateProfile] = useUpdateProfileMutation();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputProps>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: addressToEdit || defaultValues,
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

  const formSubmitHandler = async (data: InputProps) => {
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
      setEditAddress(undefined);
      dispatch(setCustomer(request.data));
    }
    if (request.error) {
      console.log(request.error);
      toast.error('something go wrong');
    }
  };

  return (
    <>
      <Divider />
      <Title
        sx={{ p: 2, textAlign: 'end', color: 'primary.main' }}
        variant="subheader"
      >
        Add new address
      </Title>
      <Divider />

      <Grid
        component={'form'}
        container
        mt={1}
        onSubmit={handleSubmit(formSubmitHandler)}
        spacing={2}
      >
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
          <Autocomplete
            disablePortal
            options={[
              { label: 'Russia', id: 1 },
              { label: 'Belarus', id: 2 },
            ]}
            renderInput={params => (
              <TextField
                {...register('country')}
                {...params}
                error={!!errors.country}
                helperText={errors.country?.message}
                label="country"
              />
            )}
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

        <Grid>
          <IconButton type="submit">
            <SendIcon />
          </IconButton>
          <IconButton />
          <IconButton />
        </Grid>
      </Grid>
    </>
  );
};

export default AddressForm;
