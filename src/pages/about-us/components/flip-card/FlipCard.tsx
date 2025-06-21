import { Box, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { useState } from 'react';

import { IDeveloper } from '../about-us-details/AboutUsDetails';
import BackSide from './back-side/BackSide';
import styles from './flipCard.module.css';
interface IFlipCardProps {
  developer: IDeveloper;
}

const FlipCard = ({ developer }: IFlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Grid
      className={styles['flip-card']}
      component={Card}
      minHeight={{ xs: '22rem', sm: '30rem', md: '22rem' }}
      onClick={() => setIsFlipped(!isFlipped)}
      size={{ xs: 12, sm: 4 }}
      sx={{ bgcolor: 'transparent' }}
    >
      <Box
        className={styles['flip-card-inner']}
        data-testid="flip-card-inner"
        style={{
          transform: isFlipped
            ? 'rotateY(180deg) translateZ(-1rem)'
            : 'translateZ(-1rem)',
        }}
      >
        <CardMedia
          className={styles['flip-card-front']}
          image={developer.img}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundPosition: 'center top',
          }}
        >
          <Box
            bgcolor={'primary'}
            borderRadius={'1rem'}
            fontSize={{ xs: '1.6rem', sm: '0.9rem', md: '1.5rem' }}
            fontWeight={'bold'}
            paddingBlock={2}
            paddingInline={1}
            textAlign={'center'}
          >
            {developer.role}
          </Box>
          <Box
            bgcolor={'primary.main'}
            borderRadius={'1rem 1rem 0 0'}
            fontSize={{ xs: '1.2rem', sm: '0.9rem', md: '1.2rem' }}
            fontWeight={'bold'}
            paddingBlock={2}
            paddingInline={1}
            textAlign={'center'}
          >
            {developer.name}
          </Box>
        </CardMedia>
        <CardContent
          className={styles['flip-card-back']}
          sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
        >
          <BackSide {...developer} />
        </CardContent>
      </Box>
    </Grid>
  );
};

export default FlipCard;
