import { Box, Button, Chip, Stack } from '@mui/material';
import { motion } from 'motion/react';

import Loading from '@/components/loading/Loading';
import Title from '@/components/title/Title';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCustomer } from '@/redux/selectors';
import { setIsEditProfile } from '@/redux/slices/authSlice';

import AuthLayout from './auth-layout/AuthLayout';
import GuestLayout from './guest-layout/GuestLayout';

const Profile = () => {
  const { customer, isLoading, isEditProfile } = useAppSelector(getCustomer);
  const dispatch = useAppDispatch();

  return (
    <Box
      animate={{ opacity: 1 }}
      component={motion.div}
      initial={{ opacity: 0 }}
    >
      <Stack alignItems={'center'} direction={'row'}>
        <Title variant="main">Profile</Title>
        <Chip
          label={isEditProfile ? 'Edit mode' : 'View mode'}
          sx={{ bgcolor: isEditProfile ? 'primary.main' : 'disabled', m: 4 }}
        />
        <Button
          disabled={!customer}
          onClick={() => {
            dispatch(setIsEditProfile(!isEditProfile));
          }}
          sx={{ ml: 'auto' }}
          variant={isEditProfile ? 'contained' : 'outlined'}
        >
          Edit
        </Button>
      </Stack>

      {isLoading ? <Loading /> : null}
      {customer ? <AuthLayout /> : <GuestLayout />}
    </Box>
  );
};
export default Profile;
