import { Box, Chip, Stack } from '@mui/material';
import { motion } from 'motion/react';
import { useState } from 'react';

import { Loading, Title } from '../../components';
import { useAppSelector } from '../../redux/hooks';
import { getCustomer } from '../../redux/selectors';
import AuthLayout from './AuthLayout';
import GuestLayout from './GuestLayout';

const Profile = () => {
  const { customer, isLoading } = useAppSelector(getCustomer);
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Box animate={{ scale: 1 }} component={motion.div} initial={{ scale: 0 }}>
      <Stack alignItems={'center'} direction={'row'}>
        <Title variant="main">Profile</Title>
        <Chip
          label={isEditMode ? 'Edit mode' : 'View mode'}
          sx={{ bgcolor: isEditMode ? 'primary.main' : 'disabled', m: 4 }}
        />
      </Stack>
      <>
        {isLoading ? <Loading /> : null}
        {customer ? (
          <AuthLayout
            customer={customer}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
          />
        ) : (
          <GuestLayout />
        )}
      </>
    </Box>
  );
};
export default Profile;
