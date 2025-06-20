import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';

import Logo from '../logo/Logo';
import Navigation from '../navigation/Navigation';
import IconsStack from './Icons-stack';
import LoginRegisterButton from './Login-register-button';

interface IProps {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
}

const DropDownPanel = ({ setIsOpen, isOpen }: IProps) => {
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setIsOpen(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpen]);
  return (
    <Box
      onClick={handleOutsideClick}
      sx={{
        position: 'fixed',
        display: { md: 'none' },
        right: '0',
        top: 0,
        width: '100vw',
        height: '100svh',
      }}
    >
      <Container
        sx={{
          position: 'absolute',
          p: '1vw',
          right: '0',
          top: '0',
          width: { sm: '60vw' },
          backgroundColor: 'background.default',
          borderRadius: 4,
          boxShadow: 3,
          backdropFilter: 'blur( 4.5px )',
          WebkitBackdropFilter: 'blur(4.5px)',
          opacity: '0.98',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Logo sx={{ display: { sm: 'none' } }} />
          <ClearRoundedIcon
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            sx={{
              position: 'relative',
              top: '8px',
              right: '6px',
              fontSize: 30,
              ml: 'auto',
              display: 'flex',
              cursor: 'pointer',
              color: 'primary.main',
            }}
          />
        </Box>

        <Navigation
          sx={{
            display: 'grid',
            placeContent: 'center',
            gap: '2rem',
            textAlign: 'center',
          }}
        />
        <Stack
          direction="row"
          justifyContent="center"
          p={4}
          sx={{
            gap: 4,
          }}
        >
          <IconsStack />
        </Stack>
        <LoginRegisterButton
          setIsOpen={setIsOpen}
          sx={{
            display: 'flex',
            maxWidth: 'fit-content',
            width: '100%',
            justifySelf: 'center',
          }}
        />
      </Container>
    </Box>
  );
};
export default DropDownPanel;
