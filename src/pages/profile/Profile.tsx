import { Box } from '@mui/material';
import { motion } from 'motion/react';

import { Loading, Title } from '../../components';
import { useGetProfileQuery } from '../../services/api';
import AuthLayout from './AuthLayout';
import GuestLayout from './GuestLayout';

const Profile = () => {
  const { data, isLoading } = useGetProfileQuery({});

  console.log(data);
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
        {!data ? <GuestLayout /> : <AuthLayout customer={data} />}
      </>
    </Box>
  );
};
export default Profile;
