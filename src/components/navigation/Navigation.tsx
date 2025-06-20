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
];

const Navigation = ({ sx, ...rest }: NavigationProps) => {
  const linksElements = links.map(link => (
    <Link component={NavLink} key={link.name} to={link.path} variant="navLink">
      {link.name}
    </Link>
  ));

  return (
    <Box sx={{ ...sx }} {...rest} component="nav">
      {...linksElements}
    </Box>
  );
};
export default Navigation;
