import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import Title from '@/components/title/Title';

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
    <Grid alignItems={'center'} container>
      <Grid component={Title} size={12}>
        To see your profile please Login or Register
      </Grid>

      <Grid
        component={Button}
        offset={4}
        onClick={() => navigate(-1)}
        size={4}
        sx={{ margin: '2rem auto 0 auto', display: 'block' }}
        variant="contained"
      >
        Go Back
      </Grid>

      <Grid
        color="error.main"
        component={Typography}
        size={12}
        textAlign={'center'}
      >
        Auto return after: {countdown}
      </Grid>
    </Grid>
  );
};

export default GuestLayout;
