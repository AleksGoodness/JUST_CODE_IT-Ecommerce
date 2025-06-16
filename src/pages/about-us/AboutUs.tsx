import { Box, Grid, Link, Paper, Typography } from '@mui/material';
import { Link as ReactLink } from 'react-router';

import { Title } from '../../components';
import FlipCard from './flip-card/flipCard';
import aleksAvatar from './imgs/ALEKS.png';
import daniarAvatar from './imgs/DANIAR.png';
import elenaAvatar from './imgs/LENA.png';
import rsLogo from './imgs/rss-logo.c19ce1b4.svg';

const MOTTOS = [
  {
    text: 'My code works, but I don’t know why — the important thing is it passes tests (sometimes). If you stare at TypeScript errors long enough, they might disappear on their own!',
  },
  {
    text: 'We’re a young team united by a grand mission — to build a project that actually runs for everyone *simultaneously*. Git conflicts? Just our way of bonding!',
  },
  {
    text: 'React.useEffect() is magic, but we pretend we get it. Clean code is when console.logs are neatly formatted. And if you reload the page 100 times, the bug might vanish!',
  },
];

const DEVELOPERS = [
  {
    name: 'Aleks Gomeniuk',
    img: aleksAvatar,
  },
  {
    name: 'Elena ',
    img: elenaAvatar,
  },
  {
    name: 'Daniar',
    img: daniarAvatar,
  },
];

const AboutUs = () => {
  return (
    <Grid>
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
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        sx={{
          mt: 2,
        }}
      >
        {...DEVELOPERS.map(developer => (
          <FlipCard developer={developer} key={developer.name} />
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
