import GitHubIcon from '@mui/icons-material/GitHub';
import MessageIcon from '@mui/icons-material/Message';
import {
  Button,
  Grid,
  IconButton,
  List,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { Link } from 'react-router';

interface Props {
  bio: string;
  name: string;
  role: string;
  gitHubLink: string;
  discordLink: string;
}

const BackSide = ({ bio, name, role, gitHubLink, discordLink }: Props) => (
  <>
    <Typography>{bio}</Typography>
    <Grid component={List} flexGrow={1}>
      <ListItemText>Name: {name}</ListItemText>
      <ListItemText>Role: {role}</ListItemText>
    </Grid>
    <Stack direction={'row'} justifyContent={'center'}>
      <Link target="_blank" to={gitHubLink}>
        <IconButton>
          <GitHubIcon />
        </IconButton>
      </Link>

      <Link target="_blank" to={discordLink}>
        <IconButton>
          <MessageIcon />
        </IconButton>
      </Link>
    </Stack>
    <Button component={Link} to={name} variant="outlined">
      read more
    </Button>
  </>
);
export default BackSide;
