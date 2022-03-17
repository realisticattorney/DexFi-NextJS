import React from 'react';
import {
  Menu,
  MenuItem as MuiMenuItem,
  Avatar,
  Divider,
  Typography,
  Switch,
  Fade,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { DarkMode as DarkModeIcon } from '@mui/icons-material';

/********************  Styled Components  ********************/
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

/********************  Main Component  ********************/
const ProfileMenu = ({ menus, active }) => {
  const history = useNavigate();

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
    history(path);
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
            <MenuItem>
              {menu?.icon}
              <ProfileMenuText>{menu.text}</ProfileMenuText>
            </MenuItem>
            <Divider style={{ margin: 0 }} />
          </div>
        ))}
        <MenuItem>
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

export default ProfileMenu;
