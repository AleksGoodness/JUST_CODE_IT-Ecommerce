import { Box, Button, Typography } from '@mui/material';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { Loading } from '../../components';
import { useAppSelector } from '../../redux/hooks';
import { getCustomer } from '../../redux/selectors';
import CONSTANTS from '../../utils/CONSTANTS';

const Profile = () => {
  const { customer, isLoading } = useAppSelector(getCustomer);
  const [countdown, setCountdown] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (customer || isLoading) {
      setCountdown(null);
      return;
    }
    setCountdown(null);

    (() => {
      setCountdown(5);
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev === null) return null;
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    })();

    return () => {
      clearInterval(timer);
    };
  }, [customer, isLoading, navigate]);

  useEffect(() => {
    if (countdown === 0) {
      navigate(-1);
    }
  }, [countdown, navigate]);

  return (
    <Box
      animate={{ scale: 1 }}
      component={motion.div}
      initial={{ scale: 0 }}
      sx={{ padding: '2rem 0 2rem 0' }}
    >
      <Typography
        align="center"
        component="h2"
        paddingBlock={5}
        variant="mainTitle"
      >
        Profile
      </Typography>
      <Box>
        {isLoading ? <Loading /> : null}
        {!customer ? (
          <>
            <Typography align="center" component={'h2'} variant="sectionTitle">
              To see your profile please Login or Register
            </Typography>

            <Button
              onClick={handleGoBack}
              sx={{ margin: '2rem auto 0 auto', display: 'block' }}
              variant="contained"
            >
              Go Back{' '}
              <Typography color="error" component={'span'}>
                {countdown}
              </Typography>
            </Button>
            <Button component={Link} to={CONSTANTS.login} />
          </>
        ) : null}
      </Box>
    </Box>
  );
};
export default Profile;
