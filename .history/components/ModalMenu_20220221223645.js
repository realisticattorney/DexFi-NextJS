import React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
const timeoutLength = 300;

const ModalMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mouseOverButton, setMouseOverButton] = useState(null);
  const [mouseOverMenu, setMouseOverMenu] = useState(null);
  const [open, setOpen] = useState(mouseOverButton || mouseOverMenu);

  handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  handleClose = () => {
    setMouseOverButton(false);
    setMouseOverMenu(false);
  };

  enterButton = () => {
    setMouseOverButton(true);
  };

  leaveButton = () => {
    // Set a timeout so that the menu doesn't close before the user has time to
    // move their mouse over it
    setTimeout(() => {
      setMouseOverButton(true);
    }, timeoutLength);
  };

  enterMenu = () => {
    setMouseOverMenu(true);
  };

  leaveMenu = () => {
    setTimeout(() => {
      setMouseOverMenu(false);
    }, timeoutLength);
  };

  return (
    <div>
      <Button
        aria-owns={open ? 'simple-menu' : null}
        aria-haspopup="true"
        onClick={handleClick}
        onMouseEnter={enterButton}
        onMouseLeave={leaveButton}
      >
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          onMouseEnter: enterMenu,
          onMouseLeave: leaveMenu,
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ModalMenu;
