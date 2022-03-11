import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import { useState, useCallback } from 'react'; //hooks
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import { useWeb3 } from '../components/providers/web3';
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
  const { slippage } = useWeb3();
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
                    <button className="shadow-sm text-white py-0.5 px-2.5 sm:px-4 bg-dexfi-cyan  rounded-3xl font-bold hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90">
                      Standard{' (5)'}
                    </button>
                    <button className="shadow-sm text-dexfi-cyan py-0.5 px-2.5 sm:px-4 bg-gray-100   rounded-3xl font-bold hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90">
                      Fast{' (6)'}
                    </button>
                    <button className="shadow-sm text-dexfi-cyan py-0.5 px-2.5 sm:px-4 bg-gray-100   rounded-3xl font-bold hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90">
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
                    <button className={`shadow-sm ${slippage } text-white py-0.5 px-4 bg-dexfi-cyan  rounded-3xl font-bold hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90`}>
                      0.1%
                    </button>
                    <button className="shadow-sm text-dexfi-cyan py-0.5 px-4 bg-gray-100   rounded-3xl font-bold hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90">
                      0.5%
                    </button>
                    <button className="shadow-sm text-dexfi-cyan py-0.5 px-4 bg-gray-100   rounded-3xl font-bold hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90">
                      1.0%
                    </button>
                    <button className="shadow-sm text-dexfi-grayviolet py-0.5 px-4 bg-gray-200 border-dexfi-grayviolet border rounded-3xl font-medium hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90">
                      0.50
                    </button>
                    <p className="mr-10 text-dexfi-cyan font-bold hidden sm:block">
                      %
                    </p>
                  </div>
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
