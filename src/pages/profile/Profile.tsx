import { Box } from '@mui/material';
import { motion } from 'motion/react';

import { Loading, Title } from '../../components';
import { useAppSelector } from '../../redux/hooks';
import { getCustomer } from '../../redux/selectors';
import AuthLayout from './AuthLayout';
import GuestLayout from './GuestLayout';

const Profile = () => {
  const { customer, isLoading } = useAppSelector(getCustomer);

  return (
    <Box
      animate={{ scale: 1 }}
      component={motion.div}
      initial={{ scale: 0 }}
      sx={{ padding: '2rem 0 2rem 0' }}
    >
      <Title variant="main">Profile</Title>
      <>
        {isLoading ? <Loading /> : null}
        {customer ? <AuthLayout customer={customer} /> : <GuestLayout />}
      </>
    </Box>
  );
};
export default Profile;
