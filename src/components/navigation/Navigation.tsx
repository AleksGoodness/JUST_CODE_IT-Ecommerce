import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { SxProps, Theme } from '@mui/material/styles';
import { NavLink } from 'react-router';

import CONSTANTS from '../../utils/CONSTANTS';

interface NavigationProps {
  sx?: SxProps<Theme>;
}

const links = [
  { name: 'home', path: CONSTANTS.home },
  { name: 'shop', path: CONSTANTS.shop },
  // { name: 'preview', path: CONSTANTS.preview },
];

const Navigation = ({ sx, ...rest }: NavigationProps) => {
  const linksElements = links.map(link => (
    <Link component={NavLink} key={link.name} to={link.path} variant="navLink">
      {link.name}
    </Link>
  ));

  return (
    <Box
      sx={{ ...sx }}
      {...rest}
      component="nav"
      // sx={{
      //   display: { xs: 'none', sm: 'flex' },
      //   justifyContent: 'center',
      //   gap: '0.6vw',
      //   flexShrink: '1',
      // }}
    >
      {...linksElements}
    </Box>
  );
};
export default Navigation;
