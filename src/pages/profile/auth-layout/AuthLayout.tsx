import { Box } from '@mui/material';

import { Loading } from '../../../components';
import { useAppSelector } from '../../../redux/hooks';
import { getCustomer } from '../../../redux/selectors';
import Addresses from './address-list/Addresses';
import NewAddress from './new-address/NewAddress';
import ProfileForm from './profile-form/ProfileForm';

const AuthLayout = () => {
  const { customer, isLoading, isEditProfile } = useAppSelector(getCustomer);

  if (isLoading) return <Loading />;
  if (customer)
    return (
      <Box>
        <ProfileForm />
        <Addresses
          addresses={customer.addresses}
          defaultBillingAddressId={customer.defaultBillingAddressId}
          defaultShippingAddressId={customer.defaultShippingAddressId}
          isEditMode={isEditProfile}
          version={customer.version}
        />
        {isEditProfile ? <NewAddress version={customer.version} /> : null}
      </Box>
    );
};

export default AuthLayout;
