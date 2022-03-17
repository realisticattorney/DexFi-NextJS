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
  // handleInputChange,
  handleMenuItemClick,
  menuNumber,
  id,
  callExchange
}) => {

  const handleInputChange = (event) => {
    event.preventDefault();
    console.log('evento', event.target.value);
    console.log('evento target', event.target.id);
    if (event.target.value > 0) {
      callExchange(event.target.value, event.target.id);
    } else if (event.target.value === '') {
      setInputOne(null);
      setInputTwo(null);
    } else if (event.target.value === '00') {
      setInputOne(inputOne);
      setInputTwo(inputTwo);
    } else {
      setInputOne(event.target.value);
      setInputTwo(event.target.value);
    }
  };

  
  return (
    <div className="flex flex-col space-y-2 p-5">
      <button onClick={handleOpen} className="flex items-center">
        <Image
          src={token[0].logoURI}
          height={24}
          width={24}
          quality={50}
          alt=""
        />
        <h1 className="ml-1 font-bold text-dexfi-violet">
          {token[0].symbol}
        </h1>
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
                  disabled={index === token[1]}
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
