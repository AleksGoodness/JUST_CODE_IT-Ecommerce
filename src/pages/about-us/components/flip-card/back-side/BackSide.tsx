import { Button, Grid, List, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

import { IDeveloper } from '../../about-us-details/AboutUsDetails';
import ContactMe from '../../contact-me/ContactMe';

const BackSide = (props: IDeveloper) => {
  const { bio, name, role, gitHub, discord, slug } = props;
  const navigate = useNavigate();

  return (
    <>
      <Typography>{bio}</Typography>
      <Grid component={List} flexGrow={1}>
        <ListItemText>
          <Typography color="primary.main">Name:</Typography> {name}
        </ListItemText>
        <ListItemText>
          <Typography color="primary.main">Role:</Typography> {role}
        </ListItemText>
      </Grid>
      <ContactMe discord={discord} gitHub={gitHub} />

      <Button
        onClick={() =>
          navigate(slug, {
            state: {
              developerData: props,
            },
          })
        }
        variant="outlined"
      >
        read more
      </Button>
    </>
  );
};
export default BackSide;
