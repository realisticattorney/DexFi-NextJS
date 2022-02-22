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
  const [open, setOpen] = useState(false);


  handleClick = event => {
    setAnchorEl(event.currentTarget)
    setOpen(true);
  };

  handleClose = () => {
    setMouseOverButton(false);
    setMouseOverMenu(false);
  };

  enterButton = () => {
    setMouseOverButton(true);
  }

  leaveButton = () => {
    // Set a timeout so that the menu doesn't close before the user has time to
    // move their mouse over it
    setTimeout(() => {
      setMouseOverButton(true);
    }, timeoutLength);
  }

  enterMenu = () => {
    setMouseOverMenu(true);
  }

  leaveMenu = () => {
     setTimeout(() => {
       setMouseOverMenu(false);
     }, timeoutLength);
  }

  render() {
    // Calculate open state based on mouse location
    const open = this.state.mouseOverButton || this.state.mouseOverMenu;

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
  }
}

export default ModalMenu;