import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import { useState, useCallback } from 'react'; //hooks
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import { useWeb3 } from '../components/providers/web3';
import { Box, TextField } from '@mui/material';
const modalstyle = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '400px',
  bgcolor: 'background.paper',
  boxShadow: 1,
  borderRadius: 6,
  padding: 0,
};

const Settings = () => {
  const handleOpenSettings = useCallback(() => setOpenSettings(true), []);
  const handleCloseSettings = useCallback(() => setOpenSettings(false), []);
  const [openSettings, setOpenSettings] = useState(false);
  const { slippage, setSlippage, txSpeed, setTxSpeed } = useWeb3();
  const [isSlippageCustom, setIsSlippageCustom] = useState(false);
  console.log('slippage', slippage);
  const setSlippageCallback = useCallback(
    (event) => {
      console.log('event', event?.target);
      if (event.target) {
        console.log('lalalalasadfasdadsfadsffasd');
        if (isNaN(parseFloat(event.target.value))) {
          console.log('aca');
          setSlippage(0);
        } else {
          if (parseFloat(event.target.value) > 50) {
            setSlippage(5);
          } else {
            setSlippage(parseFloat(event.target.value));
          }
        }
        setIsSlippageCustom(true);
      } else {
        setSlippage(event);
        setIsSlippageCustom(false);
      }
    },
    [setSlippage]
  );

  const setTxSpeedCallback = useCallback(
    (event) => {
      setTxSpeed(event);
    },
    [setTxSpeed]
  );

  return (
    <>
      <button
        onClick={() => {
          handleOpenSettings();
        }}
        className=" active:translate-y-0.1 active:shadow-none active:opacity-90 hover:opacity-75 transition-opacity duration-150"
      >
        <SettingsIcon
          sx={{
            color: '#7A6EAA',
            fontSize: 25,
          }}
        />
      </button>
      <Modal
        disablePortal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openSettings}
        onClose={handleCloseSettings}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openSettings}>
          <Paper sx={modalstyle}>
            <MenuList
              sx={{
                padding: '0',
              }}
            >
              <div className="flex  text-xl font-bold text-dexfi-violet settingsBackground border-b-2  rounded-tl-3xl border-gray-200 rounded-tr-3xl">
                <div className="p-4 sm:p-6 flex justify-between w-full">
                  <h1 className="">Settings</h1>{' '}
                  <button
                    className="hover:opacity-60 transition-opacity text-cyan-500 duration-300 cursor-pointer"
                    onClick={() => {
                      handleCloseSettings();
                    }}
                  >
                    <CloseIcon
                      sx={{
                        marginLeft: '4px',
                        fontSize: 20,
                      }}
                    />
                  </button>
                </div>
              </div>
              <div className="w-full p-4 pb-3 sm:p-6 bg-white rounded-br-3xl rounded-bl-3xl">
                <div className="flex flex-col mb-6">
                  <h2 className="text-violet-700 font-bold text-xs mb-0 text-left">
                    GLOBAL
                  </h2>
                  <div className="flex justify-between">
                    <h2 className="text-dexfi-grayviolet font-medium my-5">
                      Dark mode
                    </h2>
                    {/* <h2 className="text-dexfi-violet font-medium">0.0</h2> */}
                  </div>
                  <div className="flex justify-between">
                    <h2 className="text-dexfi-grayviolet font-medium">
                      Default Transaction Speed {'(GWEI)'}
                    </h2>
                  </div>
                  <div className="flex justify-between mt-4 pb-6 border-b border-gray-200">
                    <button
                      className={`shadow-sm ${txSpeed === 5 ? " " : "" } text-dexfi-cyan py-0.5 px-2.5 sm:px-4 bg-gray-100   rounded-3xl font-bold hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90`}
                      onClick={() => {
                        setTxSpeedCallback(7);
                      }}
                    >
                      Standard{' (5)'}
                    </button>
                    <button
                      className={`shadow-sm text-dexfi-cyan py-0.5 px-2.5 sm:px-4 bg-gray-100   rounded-3xl font-bold hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90`}
                      onClick={() => {
                        setTxSpeedCallback(7);
                      }}
                    >
                      Fast{' (6)'}
                    </button>
                    <button
                      className={`shadow-sm text-dexfi-cyan py-0.5 px-2.5 sm:px-4 bg-gray-100   rounded-3xl font-bold hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90`}
                      onClick={() => {
                        setTxSpeedCallback(7);
                      }}
                    >
                      Instant{' (7)'}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-violet-700 font-bold text-xs mb-5 text-left">
                    SWAPS AND LIQUIDITY
                  </h2>
                  <div className="flex justify-between">
                    <h2 className="text-dexfi-grayviolet font-medium">
                      Slippage Tolerance
                    </h2>
                  </div>
                  <div className="flex justify-between my-4">
                    <button
                      className={`shadow-sm ${
                        slippage === 0.1
                          ? 'text-white bg-dexfi-cyan'
                          : 'text-dexfi-cyan bg-gray-100'
                      }  py-0.5 px-4 rounded-3xl font-bold hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90`}
                      onClick={() => {
                        setSlippageCallback(0.1);
                      }}
                    >
                      0.1%
                    </button>
                    <button
                      className={`shadow-sm ${
                        slippage === 0.5
                          ? 'text-white bg-dexfi-cyan'
                          : 'text-dexfi-cyan bg-gray-100'
                      }  py-0.5 px-4 rounded-3xl font-bold hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90`}
                      onClick={() => {
                        setSlippageCallback(0.5);
                      }}
                    >
                      0.5%
                    </button>
                    <button
                      className={`shadow-sm ${
                        slippage === 1
                          ? 'text-white bg-dexfi-cyan'
                          : 'text-dexfi-cyan bg-gray-100'
                      }  py-0.5 px-4 rounded-3xl font-bold hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90`}
                      onClick={() => {
                        setSlippageCallback(1);
                      }}
                    >
                      1.0%
                    </button>
                    {/* <button className="shadow-sm text-dexfi-grayviolet py-0.5 px-4 bg-gray-200 border-dexfi-grayviolet border rounded-3xl font-medium hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90">
                      0.50
                    </button>
                    */}
                    <Box
                      component="form"
                      sx={{
                        '& .MuiTextField-root': {
                          m: 0,
                          width: '70px',
                        },

                        '& .MuiInputBase-input': {
                          backgroundColor: '#EEEAF4',
                          borderRadius: 6,
                          textIndent: 20,
                          border: isSlippageCustom
                            ? '1px solid #1FC7D4'
                            : '1px solid #CCC',
                        },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <div className="flex">
                        <TextField
                          variant="standard"
                          required
                          type="text"
                          value={isSlippageCustom ? slippage : ''}
                          placeholder={slippage ? slippage.toFixed(2) : '0.00'}
                          onChange={(e) => {
                            if (
                              !e.target.value ||
                              e.target.value === null ||
                              e.target.value.match(/^(\d*)((\.(\d*)?)?)$/i)
                            )
                              setSlippageCallback(e);
                          }}
                          InputProps={{
                            disableUnderline: true,
                            inputProps: {
                              style: {
                                textAlign: 'left',
                                fontSize: '0.9rem',
                                paddingRight: '1rem',
                              },
                            },
                          }}
                        />
                        <p className="mr-10 mt-0.7 ml-0.5 text-dexfi-cyan font-extrabold hidden sm:block">
                          {' '}
                          %
                        </p>
                      </div>
                    </Box>
                  </div>
                  <p
                    className={`${
                      slippage > 50 ? 'text-red-600' : 'text-orange-500'
                    } text-sm font-medium`}
                  >
                    {slippage < 0.1
                      ? 'Your transaction may fail'
                      : slippage > 5 && slippage < 50
                      ? 'Your transaction may be frontrun'
                      : slippage > 50
                      ? 'Enter a valid slippage percentage'
                      : ''}
                  </p>
                </div>
              </div>
            </MenuList>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
};

export default Settings;
