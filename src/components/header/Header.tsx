import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Container, IconButton, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { Navigation } from '../index.ts';
import Logo from '../logo/Logo.tsx';
import DropDownPanel from './DropDownPanel.tsx';
import IconsStack from './Icons-stack.tsx';
import LoginRegisterButton from './Login-register-button.tsx';

const StyledHeader = styled('header')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
}));

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(prev => (prev ? false : prev));
  }, [location]);

  return (
    <StyledHeader>
      <Container
        sx={{
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr auto',
            md: '1fr auto 1fr',
          },
          padding: '1vh 1vw',
          display: { xs: 'flex', sm: 'grid' },
          justifyContent: 'space-between',
        }}
      >
        <Logo sx={{ opacity: isOpen ? { xs: 0, sm: 1 } : 1 }} />
        <IconButton
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          sx={{ display: { md: 'none' }, opacity: isOpen ? 0 : 1 }}
        >
          <MenuRoundedIcon color={'primary'} />
        </IconButton>
        <Navigation
          sx={{
            display: { xs: 'none', md: 'flex' },
          }}
        />
        <Stack
          direction={'row'}
          justifyContent={'end'}
          spacing={1}
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          <IconsStack />
          <LoginRegisterButton />
        </Stack>
        {isOpen ? (
          <DropDownPanel isOpen={isOpen} setIsOpen={setIsOpen} />
        ) : null}
      </Container>
    </StyledHeader>
  );
};
export default Header;
