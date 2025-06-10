import { Grid, Typography } from '@mui/material';

import { Title } from '../../components';

const AboutUs = () => {
  return (
    <Grid>
      <Title>About JustCodeIT Team</Title>
      <Typography>
        We are &quot Just Code It &quot — RS School students who accidentally
        became friends with TypeScript, are trying to be friends with React, and
        sometimes write clean code (by accident, but it works!). Our experience
        is typical: finished tasks, added ESLint (sometimes we listen). We try
        to work in one repo, Google fast, and make it pretty first, right later.
        Join us if you know *any* is not a solution (but maybe), use
        *console.log* as a debugger, and laugh when the build fails. We &apos re
        not perfect — yet.
      </Typography>
    </Grid>
  );
};

export default AboutUs;
