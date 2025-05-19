import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { NavLink } from 'react-router';

import CONSTANTS from '../../utils/CONSTANTS';

const links = [
  { name: 'home', path: CONSTANTS.home },
  { name: 'shop', path: CONSTANTS.shop },
  // { name: 'preview', path: CONSTANTS.preview },
];

const Navigation = () => {
  const linksElements = links.map(link => (
    <Link component={NavLink} key={link.name} to={link.path} variant="navLink">
      {link.name}
    </Link>
  ));

  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.6vw',
        flexShrink: '1',
      }}
    >
      {...linksElements}
    </Box>
  );
};
export default Navigation;
