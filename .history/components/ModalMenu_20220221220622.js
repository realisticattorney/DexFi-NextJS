import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import Link from 'next/link';
import { useState } from 'react';
import {
   Menu,
   MenuItem as MuiMenuItem,
   Avatar,
   Divider,
   Typography,
   Switch,
   Fade,
 } from '@mui/material';
 import { useHistory } from 'react-router-dom';
 import { styled } from '@mui/styles';
 import { DarkMode as DarkModeIcon } from '@mui/icons-material';
 

const ModalMenu = () => {
   const history = useHistory();

   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
 
   const handleClick = (event) => {
     if (anchorEl) {
       setAnchorEl(null);
     } else {
       setAnchorEl(event.currentTarget);
     }
   };
 
   const handleClose = () => {
     setAnchorEl(null);
   };
 
   const goPath = (path) => {
     setAnchorEl(null);
     history.push(path);
   };
 
   const leaveMenu = () => {
     setTimeout(() => {
       setAnchorEl(null);
     }, 300);
   };
  return (
   <div onMouseLeave={leaveMenu}>
   <UserAvatarButton
     id="account-button"
     active={active}
     aria-controls={open ? 'account-menu' : undefined}
     aria-haspopup="true"
     aria-expanded={open ? 'true' : undefined}
     onClick={handleClick}
     onMouseOver={(event) => setAnchorEl(event.currentTarget)}
   >
     <Avatar
       sx={{
         width: 38,
         height: 38,
       }}
       alt="Avatar"
       src="https://i.pravatar.cc/300"
     />
   </UserAvatarButton>
   <ProfileMenuNavigation
     id="account-menu"
     anchorEl={anchorEl}
     open={open}
     onClose={handleClose}
     MenuListProps={{
       'aria-labelledby': 'account-button',
       onMouseLeave: leaveMenu,
     }}
     anchorOrigin={{
       vertical: 'bottom',
       horizontal: 'right',
     }}
     transformOrigin={{
       vertical: 'top',
       horizontal: 'right',
     }}
     TransitionComponent={Fade}
   >
     {menus.map((menu, index) => (
       <div key={index}>
         <MenuItem onClick={() => goPath(menu.path)}>
           {menu?.icon}
           <ProfileMenuText>{menu.text}</ProfileMenuText>
         </MenuItem>
         <Divider style={{ margin: 0 }} />
       </div>
     ))}
     <MenuItem onClick={() => {}}>
       <DarkModeIcon />
       <ProfileMenuText>Night Mode</ProfileMenuText>
       <div style={{ marginLeft: 16 }}>
         <Switch />
       </div>
     </MenuItem>
   </ProfileMenuNavigation>
    </div>
  );
};

export default ModalMenu;
