import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { Loading } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getCustomer } from '../../../redux/selectors';
import { setCustomer } from '../../../redux/slices/authSlice';
import { useUpdateProfileMutation } from '../../../services/api';
import AddressForm, { InputProps } from './address-form/AddressForm';
import Addresses from './address-list/Addresses';
import ProfileForm from './profile-form/ProfileForm';

const AuthLayout = () => {
  const { customer, isLoading, isEditProfile } = useAppSelector(getCustomer);
  const [updateProfile] = useUpdateProfileMutation();
  const dispatch = useAppDispatch();
  const [editAddress, setEditAddress] = useState<InputProps>();

  const handleDeleteAddress = (id: string) => {
    if (!customer) return;
    updateProfile({
      version: customer.version,

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

  if (isLoading) return <Loading />;
  if (customer)
    return (
      <Box>
        <ProfileForm />
        <Grid
          addresses={customer.addresses}
          component={Addresses}
          defaultBillingAddressId={customer.defaultBillingAddressId}
          defaultShippingAddressId={customer.defaultShippingAddressId}
          handleDeleteAddress={handleDeleteAddress}
          isEditMode={isEditProfile}
          setEditAddress={setEditAddress}
        />

        {isEditProfile ? (
          <AddressForm
            addressToEdit={editAddress}
            setEditAddress={setEditAddress}
            version={customer.version}
          />
        ) : null}
      </Box>
    );
};

export default AuthLayout;
