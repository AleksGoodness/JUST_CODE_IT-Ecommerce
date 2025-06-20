import SvgIcon from '@mui/material/SvgIcon';
import { SvgIconProps } from '@mui/material/SvgIcon';

import MagnifierSvg from './MagnifierSvg';
const Magnifier = (props: SvgIconProps) => (
  <SvgIcon component={MagnifierSvg} {...props} />
);
export default Magnifier;
