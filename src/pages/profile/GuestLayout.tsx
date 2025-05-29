import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { Title } from '../../components';
import CONSTANTS from '../../utils/CONSTANTS';

const GuestLayout = () => {
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

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
  }, [navigate]);

  useEffect(() => {
    if (countdown === 0) {
      navigate(-1);
    }
  }, [countdown, navigate]);

  return (
    <>
      <Title>To see your profile please Login or Register</Title>

      <Button
        onClick={() => navigate(-1)}
        sx={{ margin: '2rem auto 0 auto', display: 'block' }}
        variant="contained"
      >
        Go Back
        <Typography color="error" component={'span'}>
          {countdown}
        </Typography>
      </Button>
      <Button component={Link} to={CONSTANTS.login} />
    </>
  );
};

export default GuestLayout;
