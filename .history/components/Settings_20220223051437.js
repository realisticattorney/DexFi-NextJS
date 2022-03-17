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
import { useState, useEffect, useRef, useCallback } from 'react'; //hooks
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

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

const Settings = () => {
  const handleOpenSettings = useCallback(() => setOpenSettings(true), []);
  const handleCloseSettings = useCallback(() => setOpenSettings(false), []);
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          handleOpenSettings();
        }}
        className="text-gray-600"
      >
        <SettingsIcon
          sx={{
            color: '#7c6484',
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
                <div className="p-6 flex justify-between w-full">
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
              <div className="w-full p-7 border-gray-200 border-b  bg-gray-50"></div>
              <div className="w-full p-6 bg-white rounded-br-3xl rounded-bl-3xl">
                <div className="flex flex-col">
                  <h2 className="text-violet-700 font-semibold text-sm mb-2.5">
                    Your Address
                  </h2>
                  <h2 className="bg-gray-100 py-2 rounded-2xl text-dexfi-violet font-bold text-center ">
                    0xf389aaabsdb423f2l3490dd0BBB9SdfsF7
                  </h2>
                  <div className="p-4 my-6 bg-orange-50 border border-orange-300 rounded-xl">
                    <div className="flex">
                      <WarningIcon
                        sx={{
                          fontSize: 24,
                          color: '#FFB237',
                        }}
                      />
                      <div className="ml-3">
                        <h1 className="text-dexfi-violet font-bold">
                          SCAM Balance Low
                        </h1>
                        <h1 className="text-dexfi-violet font-medium">
                          Your need SCAM for transaction fees.
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="text-dexfi-grayviolet font-medium">
                      SCAM Balance
                    </h2>
                    <h2 className="text-dexfi-violet font-medium">0.0</h2>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="text-dexfi-grayviolet font-medium">
                      ETH Balance
                    </h2>
                    <h2 className="text-dexfi-violet font-medium">0.000</h2>
                  </div>
                  <div className="flex my-6 justify-end font-bold text-cyan-500">
                    View on BscScan
                    <ExitToAppIcon
                      sx={{
                        marginLeft: '4px',
                      }}
                    />
                  </div>
                  <button
                    className="w-full border-cyan-500 border-2  text-cyan-500 font-bold py-3 px-12 rounded-2xl hover:opacity-75 transition-opacity duration-300"
                    onClick={() => {}}
                  >
                    Disconnect Wallet
                  </button>
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
