import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button } from '@mui/material';
import PropTypes from 'prop-types';
import Link from 'next/link';
// components
import Profile from './Profile';
import { IconBellRinging, IconMenu } from '@tabler/icons-react';
import MenuLogo from '../shared/logo/menuLogo';
import MenuLogoProps from '../shared/logo/menuLogo';
import { baselightTheme } from '@/utils/theme/DefaultColors';

interface ItemType {
  toggleMobileSidebar:  (event: React.MouseEvent<HTMLElement>) => void;
  
}

const Header = ({toggleMobileSidebar}: {toggleMobileSidebar: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void}) => {

  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  interface MenuLogoProps {
    // Other props
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
  }

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: baselightTheme.palette.primary.light,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
      <MenuLogo onClick={(event) => toggleMobileSidebar(event)} />        


        
          

       
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
