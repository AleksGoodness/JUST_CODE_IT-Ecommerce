import GitHubIcon from '@mui/icons-material/GitHub';
import MessageIcon from '@mui/icons-material/Message';
import { IconButton, Stack } from '@mui/material';
import { Link } from 'react-router';
const ContactMe = ({
  gitHub,
  discord,
}: {
  gitHub: string;
  discord: string;
}) => {
  return (
    <Stack direction={'row'} justifyContent={'center'}>
      <Link target="_blank" to={gitHub}>
        <IconButton>
          <GitHubIcon color="primary" />
        </IconButton>
      </Link>

      <Link target="_blank" to={discord}>
        <IconButton>
          <MessageIcon color="primary" />
        </IconButton>
      </Link>
    </Stack>
  );
};

export default ContactMe;
