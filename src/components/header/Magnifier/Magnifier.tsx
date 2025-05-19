import SvgIcon from '@mui/material/SvgIcon';

import { lightTheme } from '../../../theme/theme';
import MagnifierSvg from './MagnifierSvg';
const Magnifier = () => {
  return (
    <SvgIcon
      component={MagnifierSvg}
      sx={{
        fontSize: 'clamp(1.05rem, 3.3vw, 2.1rem)',
        color: lightTheme.palette.primary.main,
        transition: 'color 0.3s',
        cursor: 'pointer',
        '&:hover': {
          color: lightTheme.palette.primary.dark,
        },
      }}
      viewBox="-5 -7 30 30"
    />
  );
};
export default Magnifier;
