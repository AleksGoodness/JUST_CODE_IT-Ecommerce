import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Title } from '../../../../../components';
import { useAppDispatch } from '../../../../../redux/hooks';
import {
  setCustomer,
  setIsEditProfile,
} from '../../../../../redux/slices/authSlice';
import { useUpdateProfileMutation } from '../../../../../services/api';
import { getCountryCodeByName } from '../../../../../utils/getCountryNameByCode';
import AddressForm from '../AddressForm';
import baseSchema from '../baseSchema';

interface UpdateAction {
  action: string;
  addressId?: string;
  address?: {
    country: string;
    streetName: string;
    city: string;
    postalCode: string;
  };
}

interface IDefaultValues {
  country: string;
  streetName: string;
  city: string;
  postalCode: string;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
}

const initialValues: IDefaultValues = {
  country: '',
  streetName: '',
  city: '',
  postalCode: '',
  isDefaultShipping: false,
  isDefaultBilling: false,
};

const NewAddress = ({ version }: { version: number }) => {
  const [updateProfile] = useUpdateProfileMutation();
  const dispatch = useAppDispatch();

  const methods = useForm<IDefaultValues>({
    mode: 'onChange',
    resolver: yupResolver(baseSchema),
    defaultValues: initialValues,
  });

  const formSubmitHandler = async (data: IDefaultValues) => {
    try {
      const countryCode = getCountryCodeByName(data.country);

      const actions: UpdateAction[] = [
        {
          action: 'addAddress',
          address: {
            country: countryCode,
            streetName: data.streetName,
            city: data.city,
            postalCode: data.postalCode,
          },
        },
      ];

      let response = await updateProfile({
        version,
        actions,
      }).unwrap();

      const newAddressId = response.addresses[response.addresses.length - 1].id;
      const updateActions = [];

      if (data.isDefaultShipping) {
        updateActions.push({
          action: 'setDefaultShippingAddress',
          addressId: newAddressId,
        });
      }

      if (data.isDefaultBilling) {
        updateActions.push({
          action: 'setDefaultBillingAddress',
          addressId: newAddressId,
        });
      }

      if (updateActions.length > 0) {
        response = await updateProfile({
          version: response.version,
          actions: updateActions,
        }).unwrap();
      }

      dispatch(setCustomer(response));
      dispatch(setIsEditProfile(false));
      toast.success('Address added successfully');
      methods.reset();
    } catch (error) {
      console.error('Failed to add address:', error);
      toast.error('Failed to add address');
    }
  };

  return (
    <Grid container>
      <Title>Add new address</Title>
      <FormProvider {...methods}>
        <AddressForm
          defaultValue={initialValues}
          formSubmitHandler={formSubmitHandler}
        />
      </FormProvider>
    </Grid>
  );
};

export default NewAddress;
