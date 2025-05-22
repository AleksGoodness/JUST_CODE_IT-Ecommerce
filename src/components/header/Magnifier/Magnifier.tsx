import SvgIcon from '@mui/material/SvgIcon';
import { SvgIconProps } from '@mui/material/SvgIcon';

import MagnifierSvg from './MagnifierSvg';
const Magnifier = (props: SvgIconProps) => (
  <SvgIcon
    component={MagnifierSvg}
    sx={{
      transition: 'color 0.3s',
      cursor: 'pointer',
    }}
    {...props}
  />
);
export default Magnifier;
