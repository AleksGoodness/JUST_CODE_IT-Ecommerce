import { Box, Grid, Link, Paper, Typography } from '@mui/material';
import { motion } from 'motion/react';
import { Link as ReactLink } from 'react-router';

import { Title } from '../../components';
import { COLLABORATION, DEVELOPERS, MOTTOS } from './data';
import FlipCard from './flip-card/flipCard';
import rsLogo from './imgs/rss-logo.c19ce1b4.svg';

const AboutUs = () => {
  return (
    <Grid animate={{ scale: 1 }} component={motion.div} initial={{ scale: 0 }}>
      <Title
        sx={{ fontSize: 'clamp(1.2rem, calc(1.4vw + 1rem), 4rem)' }}
        textAlign={'center'}
        variant="main"
      >
        About
        <Typography
          color="primary"
          component={'span'}
          fontSize={'inherit'}
          sx={{
            fontWeight: '900',
            textTransform: 'none',
            p: 1,
          }}
        >
          JustCodeIT
        </Typography>
        Team
      </Title>

      <Grid container paddingBlock={4} spacing={{ xs: 1, md: 2 }}>
        {...DEVELOPERS.map(developer => (
          <FlipCard developer={developer} key={developer.name} />
        ))}
      </Grid>

      <Grid container gap={2} paddingBlock={2}>
        <Title color="primary.main">Collaboration & Teamwork 🤝</Title>
        {...COLLABORATION.map((paragraph, i) => (
          <Typography key={i} variant="body1">
            {paragraph}
          </Typography>
        ))}
      </Grid>

      <Grid container spacing={{ xs: 1, md: 2 }} sx={{ mt: 2 }}>
        {MOTTOS.map((motto, index) => (
          <Grid key={index} size={{ sm: 4 }}>
            <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              <Typography color="primary" gutterBottom variant="h6">
                Our Motto #{index + 1}
              </Typography>
              <Typography>{motto.text}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid alignItems={'center'} container gap={2} justifyContent={'center'}>
        <Link
          color="inherit"
          component={ReactLink}
          p={2}
          target="_blank"
          to="https://rs.school/"
          underline="none"
        >
          <Box
            alignItems={'center'}
            display={'flex'}
            gap={2}
            justifyItems={'center'}
          >
            <img alt="rs-school logo" height={50} src={rsLogo} width={50} />
            <Typography variant="body1">The school that teach you!</Typography>
          </Box>
        </Link>
      </Grid>
    </Grid>
  );
};

export default AboutUs;
