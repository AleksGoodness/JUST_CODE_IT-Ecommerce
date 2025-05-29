import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import Navigation from '../navigation/Navigation';

interface IProps {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
}

const AsidePanel = ({ setIsOpen, isOpen }: IProps) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        p: '2vw',
        right: '0',
        top: '0',
        width: '60vw',
        backgroundColor: 'background.default',
        borderRadius: 4,
        boxShadow: 3,
        backdropFilter: 'blur( 4.5px )',
        WebkitBackdropFilter: 'blur(4.5px)',
        opacity: '0.994',
      }}
    >
      <ClearRoundedIcon
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        sx={{
          fontSize: 30,
          ml: 'auto',
          display: 'block',
          cursor: 'pointer',
          color: 'primary.main',
        }}
      />

      <Navigation
        sx={{
          display: 'grid',
          placeContent: 'center',
          gap: '2rem',
          textAlign: 'center',
        }}
      />
    </Box>
  );
};
export default AsidePanel;
