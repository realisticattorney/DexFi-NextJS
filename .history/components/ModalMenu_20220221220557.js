import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import Link from 'next/link';
import { useState } from 'react';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(10),
    minWidth: 140,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

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
