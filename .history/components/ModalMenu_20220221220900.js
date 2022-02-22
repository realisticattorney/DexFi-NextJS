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
 
 const UserAvatarButton = styled('div')(({ active, theme }) => ({
   height: 72,
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   padding: '0px 20px',
   cursor: 'pointer',
   borderBottom: active ? `3px solid ${theme.palette.primary.main}` : 'none',
   borderRadius: 0,
 }));
 
 const ProfileMenuNavigation = styled(Menu)(() => ({
   '& .MuiList-root': {
     paddingTop: 0,
     paddingBottom: 0,
     minWidth: 220,
     maxWidth: 350,
   },
 }));
 
 const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
   padding: 16,
   width: '100%',
   '&:hover': {
     backgroundColor: theme.palette.background.main,
     boxShadow: '5px 0px 5px 0px #888888',
     transition: 'box-shadow 0.3s ease-in-out',
   },
 }));
 
 const ProfileMenuText = styled(Typography)(() => ({
   fontFamily: 'Poppins',
   marginLeft: 16,
   marginRight: 16,
   fontSize: 16,
   fontWeight: 600,
 }));

const ModalMenu = ({ menus, active }) => {
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
   <div>
   <Button
     aria-owns={this.state.open ? 'simple-menu' : null}
     aria-haspopup="true"
     onClick={this.handleClick}
     onMouseEnter={this.enterButton}
     onMouseLeave={this.leaveButton}
   >
     Open Menu
   </Button>
   <Menu
     id="simple-menu"
     anchorEl={this.state.anchorEl}
     open={open}
     onClose={this.handleClose}
     MenuListProps={{
       onMouseEnter: this.enterMenu,
       onMouseLeave: this.leaveMenu,
     }}

   >
     <MenuItem onClick={this.handleClose}>Profile</MenuItem>
     <MenuItem onClick={this.handleClose}>My account</MenuItem>
     <MenuItem onClick={this.handleClose}>Logout</MenuItem>
   </Menu>
 </div>
  );
};

export default ModalMenu;
