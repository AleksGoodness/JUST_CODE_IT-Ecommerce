import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
} from '@mui/material';
import { useState } from 'react';

import BackSide from './backSide';
import styles from './flipCard.module.css';
interface IFlipCardProps {
  developer: {
    img: string;
    name: string;
    role: string;
    contributions: string[];
    bio: string;
    gitHub: string;
    discord: string;
  };
}

const FlipCard = ({
  developer: { img, name, role, bio, gitHub, discord },
}: IFlipCardProps) => {
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
          <CardMedia
            className={styles['flip-card-front']}
            image={img}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              bgcolor={'primary'}
              borderRadius={'1rem'}
              fontSize={{ xs: '1.6rem', sm: '0.9rem', md: '1.5rem' }}
              fontWeight={'bold'}
              paddingBlock={2}
              paddingInline={1}
            >
              {role}
            </Box>
            <Box
              bgcolor={'primary.main'}
              borderRadius={'1rem 1rem 0 0'}
              fontSize={{ xs: '1.6rem', sm: '0.9rem', md: '1.5rem' }}
              fontWeight={'bold'}
              paddingBlock={2}
              paddingInline={1}
            >
              {name}
            </Box>
          </CardMedia>
          <CardContent
            className={styles['flip-card-back']}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <BackSide
              bio={bio}
              discordLink={discord}
              gitHubLink={gitHub}
              name={name}
              role={role}
            />
          </CardContent>
        </Box>
      </CardActionArea>
    </Grid>
  );
};

export default FlipCard;
