import React from 'react';
import Image from 'next/image';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const modalstyle = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 1,
  borderRadius: 9,
  p: 2,
};

const MenuItemList = ({
  handleOpen,
  handleClose,
  currencies,
  token,
  open,
  input,
  handleInputChange,
  handleMenuItemClick,
  menuNumber,
  id,
  section,
}) => {
  const modalIsDisabled =
    id === 'outlined-number-2' && section === 'add' ? 'yes' : 'no';
  const ethIsDisabled =
    id === 'outlined-number-1' && section === 'add' ? 'yes' : 'no';
  return (
    <div className="flex flex-col space-y-2 p-5">
      <button
        onClick={() => {
          modalIsDisabled === 'yes' ? '' : handleOpen();
        }}
        className="flex items-center"
      >
        <Image
          src={token[0].logoURI}
          height={24}
          width={24}
          quality={50}
          alt=""
        />
        <h1 className="ml-1 font-bold text-dexfi-violet">{token[0].symbol}</h1>
        <KeyboardArrowDownIcon sx={{ color: '#280D5F', fontSize: 20 }} />
      </button>
      <Modal
        disablePortal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper sx={modalstyle}>
            <MenuList>
              <div className="flex px-3 pb-5 text-xl font-medium text-dexfi-violet border-b mb-4">
                <h1>Select a Token</h1>
              </div>
              {currencies.map((currency, index) => (
                <MenuItem
                  key={currency.symbol}
                  disabled={
                    ethIsDisabled === 'yes'
                      ? index === token[1] || index === 1
                      : index === token[1]
                  }
                  selected={index === token[1]}
                  onClick={(event) =>
                    handleMenuItemClick(event, index, menuNumber)
                  }
                >
                  <Image
                    src={currency.logoURI}
                    height={24}
                    width={24}
                    quality={50}
                    alt=""
                  />
                  <h1 className="ml-3">{currency.symbol}</h1>
                </MenuItem>
              ))}
            </MenuList>
          </Paper>
        </Fade>
      </Modal>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {
            m: 0,
            width: '100%',
          },
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#F5F5F5',
            borderRadius: 3,
            border: '3px solid #E5E5E5',
          },
          '& .MuiInputBase-root': {
            backgroundColor: '#F5F5F5',
            borderRadius: 3,
            border: '6px solid #fff',
          },
          '& .MuiBox-root': {
            backgroundColor: '#F5F5F5',
            borderRadius: 3,
            border: '3px solid #E5E5E5',
          },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id={id}
            type="number"
            value={input === null ? '' : input}
            placeholder="0.0"
            onChange={handleInputChange}
          />
        </div>
      </Box>
    </div>
  );
};

export default MenuItemList;
