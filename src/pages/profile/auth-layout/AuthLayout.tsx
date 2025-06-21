import { Box } from '@mui/material';

import Loading from '@/components/loading/Loading';
import { useAppSelector } from '@/redux/hooks';
import { getCustomer } from '@/redux/selectors';

import NewAddress from './address-form/new-address/NewAddress';
import AddressesList from './address-list/AddressesList';
import PasswordChanger from './password-changer/PasswordChanger';
import ProfileForm from './profile-form/ProfileForm';

const AuthLayout = () => {
  const { customer, isLoading, isEditProfile } = useAppSelector(getCustomer);

  if (isLoading) return <Loading />;
  if (customer)
    return (
      <Box>
        <PasswordChanger />
        <ProfileForm />
        <AddressesList
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
