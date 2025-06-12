import { Box, Grid, Paper } from '@mui/material';
import { useState } from 'react';

import styles from './flipCard.module.css';

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Grid size={{ xs: 12, sm: 4 }} sx={{ tabIndex: 0 }}>
      <Box
        className={styles['flip-card']}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <Paper
          className={styles['flip-card-inner']}
          style={{
            transform: isFlipped
              ? 'rotateY(180deg) translateZ(-1rem)'
              : 'translateZ(-1rem)',
          }}
        >
          <Box className={styles['flip-card-front']}>FRONT</Box>
          <Box className={styles['flip-card-back']}>BACK</Box>
        </Paper>
      </Box>
    </Grid>
  );
};

export default FlipCard;
