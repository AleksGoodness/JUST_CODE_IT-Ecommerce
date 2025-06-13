import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router';

import styles from './flipCard.module.css';

interface IFlipCardProps {
  developer: {
    img: string;
    name: string;
  };
}

const FlipCard = ({ developer: { img, name = 'aleks' } }: IFlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Grid component={Card} minHeight={340} size={{ xs: 12, sm: 4 }}>
      <CardActionArea
        className={styles['flip-card']}
        onClick={() => setIsFlipped(!isFlipped)}
        sx={{ bgcolor: 'transparent' }}
      >
        <Box
          className={styles['flip-card-inner']}
          style={{
            transform: isFlipped
              ? 'rotateY(180deg) translateZ(-1rem)'
              : 'translateZ(-1rem)',
          }}
        >
          <CardMedia className={styles['flip-card-front']} image={img}>
            FRONT
          </CardMedia>
          <CardContent className={styles['flip-card-back']}>
            <Button component={Link} to={name} variant="outlined">
              read more
            </Button>
          </CardContent>
        </Box>
      </CardActionArea>
    </Grid>
  );
};

export default FlipCard;
