import CheckIcon from '@mui/icons-material/Check';
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router';

import { Title } from '../../../../components';
import ContactMe from '../contact-me/ContactMe';

export interface IDeveloper {
  name: string;
  slug: string;
  role: string;
  bio: string;
  img: string;
  gitHub: string;
  discord: string;
  contributions: string[];
}

const AboutUsDetails = () => {
  const { state } = useLocation() as { state: { developerData: IDeveloper } };
  const [developer] = useState(state.developerData);
  return (
    <Grid container paddingBlock={4} spacing={{ xs: 1, sm: 2, md: 4 }}>
      <Grid size={{ xs: 12, sm: 5, md: 4 }}>
        <Box
          alt={developer.name}
          borderRadius={4}
          component={'img'}
          overflow={'hidden'}
          src={developer.img}
          sx={{ objectPosition: 'center', objectFit: 'contain', width: '100%' }}
        />
        <Grid alignItems={'flex-start'} container direction={'column'}>
          <Typography>Contact me:</Typography>
          <ContactMe discord={developer.discord} gitHub={developer.gitHub} />
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, sm: 7, md: 8 }}>
        <Typography
          component={'article'}
          fontSize={'clamp(1rem, 5vw, 2rem)'}
          pb={4}
        >
          Hello from
          <Typography
            color="primary.main"
            component={'span'}
            fontSize={'clamp(1rem, 5vw, 2rem)'}
            pl={2}
          >
            {developer.name}
            <Title color="warning" pb={2} variant="subheader">
              {developer.role}
            </Title>
          </Typography>
        </Typography>

        <Title pb={2} variant="subheader">
          {developer.bio}
        </Title>

        <Title variant="subheader"> I have done:</Title>
        <List>
          {...developer.contributions.map((contribution, i) => (
            <ListItem
              key={i}
              sx={{
                borderRadius: 1,
                bgcolor: i % 2 === 0 ? 'action.hover' : 'background.paper',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateX(4px)',
                  boxShadow: 1,
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: 'primary.main' }}>
                <CheckIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={contribution} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default AboutUsDetails;
