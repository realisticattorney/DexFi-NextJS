import { ethers } from 'ethers';
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
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '400px',
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
  data,
  accountEthBalance,
  handleInputChange,
  handleMenuItemClick,
  menuNumber,
  id,
  section,
}) => {
  const modalIsDisabled = id === '2' && section === 'add' ? 'yes' : 'no';
  const ethIsDisabled = id === '1' && section === 'add' ? 'yes' : 'no';
  const reg = /^(0|[1-9]\d*)(\.\d+)?$/;
  return (
    <div className="flex flex-col space-y-2 px-4 py-5">
      <div className="flex justify-between">
        <button
          onClick={() => {
            modalIsDisabled === 'yes' ? '' : handleOpen();
          }}
          className="flex items-center ml-3.5 mb-0.5"
        >
          <Image
            src={token[0].logoURI}
            height={24}
            width={24}
            quality={50}
            alt=""
          />
          <h1 className="ml-2 font-bold text-dexfi-violet">
            {token[0].symbol}
          </h1>
          <KeyboardArrowDownIcon sx={{ color: '#280D5F', fontSize: 20 }} />
        </button>
        {token[1] !== 1 && data?.map((t) =>
          t.token_address === token[0].address.toLowerCase() ? (
            <h1 className="text-sm text-dexfi-violet">
              Balance:{' '}
              {parseFloat(ethers.utils.formatEther(t.balance)).toFixed(2)}
            </h1>
          ) : null
        )}
        {token[1] === 1 && <h1>{typeof accountEthBalance}</h1>}
      </div>
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
                  onClick={() => handleMenuItemClick(index, menuNumber)}
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
          marginLeft: '8px',
          marginRight: '8px',
          '& .MuiTextField-root': {
            m: 0,
            width: '100%',
          },

          '& .MuiInputBase-input': {
            backgroundColor: '#EEEAF4',
            borderRadius: 3,
            height: 48,
            textIndent: 0,
          },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            variant="standard"
            required
            id={id}
            type="text"
            value={input === null ? '' : input}
            placeholder="0.0"
            onChange={(e) => {
              let input = e.target.value;
              if (!input || input.match(/^(\d*)((\.(\d*)?)?)$/i))
                handleInputChange(input, e.target.id);
            }}
            InputProps={{
              disableUnderline: true,
              inputProps: {
                style: {
                  textAlign: 'right',
                  fontSize: '1rem',
                  paddingRight: '1rem',
                },
              },
            }}
          />
        </div>
      </Box>
    </div>
  );
};

export default MenuItemList;
