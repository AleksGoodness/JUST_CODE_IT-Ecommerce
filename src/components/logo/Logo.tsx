import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import { NavLink } from 'react-router';

import LogoMain from '../header/LogoMain';
interface Props {
  sx?: SxProps<Theme>;
}
const Logo = ({ sx, ...rest }: Props) => {
  return (
    <Box
      component={NavLink}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '180px',
        ...sx,
      }}
      {...rest}
      to="/"
    >
      <LogoMain />
    </Box>
  );
};
export default Logo;
