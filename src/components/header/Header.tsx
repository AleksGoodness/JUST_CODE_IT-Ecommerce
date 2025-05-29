import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Container, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { NavLink } from 'react-router';

import { Navigation } from '../index.ts';
import AsidePanel from './DropDownPanel.tsx';
import LogoMain from './LogoMain';

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

  return (
    <StyledHeader>
      <Container
        sx={{
          gridTemplateColumns: { xs: '1fr', sm: '1fr auto 1fr' },
          padding: '1vw',
          display: { xs: 'flex', sm: 'grid' },
          justifyContent: 'space-between',
        }}
      >
        <Box
          component={NavLink}
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '180px',
          }}
          to="/"
        >
          <LogoMain />
        </Box>
        <IconButton
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          sx={{ display: { md: 'none' } }}
        >
          <MenuRoundedIcon />
        </IconButton>
        <Navigation
          sx={{
            display: { xs: 'none', md: 'flex' },
          }}
        />
        {isOpen ? <AsidePanel isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
      </Container>
    </StyledHeader>
  );
};
export default Header;
