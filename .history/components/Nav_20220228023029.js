import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWeb3 } from '../components/providers/web3';
import { useAccount } from '../components/web3/hooks/useAccount';
import { useRouter } from 'next/router';
import ModalMenu from './ModalMenu.js';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import WarningIcon from '@mui/icons-material/Warning';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import Settings from './Settings';

const modalstyle = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 1,
  borderRadius: 6,
  p: 0,
};

const Nav = () => {
  const { connect, isWeb3Loaded, isUserWalletConnected, exchangeBunny } =
    useWeb3();
  let router = useRouter();
  const [pathname, setPathname] = useState(router.pathname);

  const [openWallet, setOpenWallet] = useState(false);
  const handleOpenWallet = useCallback(() => setOpenWallet(true), []);
  const handleCloseWallet = useCallback(() => setOpenWallet(false), []);

  const { account } = useAccount();

  useEffect(() => {
    if (router === pathname) {
      return;
    }
    setPathname(router.pathname);
  }, [router, pathname, setPathname]);

  return (
    <div className="flex border-b-1.5 border-gray-200 p-0 items-center">
      <div className="p-3 flex mr-2.5">
        <Link href="/">
          <a className="flex">
            <Image src="/bunny.svg" height={32} width={32} alt="" />
            <p className="text-xl font-bold ml-2 tracking-tight hidden lg:flex">
              BunnySwap
            </p>
          </a>
        </Link>
      </div>
      <div className="relative">
        <ModalMenu pathname={pathname} />
      </div>
      <div className="ml-auto mr-3 flex">
      
        <div className="flex mx-3 space-x-1">
          <Image src="/logo.png" height={24} width={26} alt="" />
          <h2 className="text-dexfi-grayviolet mt-0.1 pt-0.1 font-bold">
            ${(exchangeBunny?.reserve / exchangeBunny?.balance).toFixed(3)}
          </h2>
        </div>
        <Settings />
      </div>
      {isUserWalletConnected ? (
        <>
          <button
            className="ml-5 mr-4 text-violet-900 font-bold py-0.8 px-6 shadow-slate-400 shadow-sm tracking-wide bg-gray-100 rounded-full relative z-40 group hover:opacity-90 cursor-pointer"
            disabled={true}
          >
            <AccountBalanceWalletIcon
              sx={{
                color: '#7c6484',
                fontSize: 38,
                position: 'absolute',
                border: '2px solid #1FC7D4',
                padding: '4px',
                borderRadius: '50%',
                left: '-20px',
                backgroundColor: '#fff',
                top: '-2px',
                color: '#1FC7D4',
              }}
            />
            <div className="flex max-w-[100px]">
              <div className="truncate">{account}</div>
              <KeyboardArrowDownIcon
                sx={{
                  marginRight: '-18px',
                }}
              />
            </div>
            <ul className="absolute right-0 top-0 mt-8 py-1  w-[280px] rounded-2xl border shadow-sm bg-white z-40 hidden group-hover:block">
              <button
                className="px-2 w-full whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                onClick={() => {
                  handleOpenWallet();
                }}
              >
                <a className="text-sm mx-3 text-violet-700 font-bold">Wallet</a>
              </button>
              <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
                <a className="text-sm mx-3 text-dexfi-grayviolet font-semibold">
                  Recent Transactions
                </a>
              </li>

              <li className="whitespace-no-wrap flex items-center text-gray-600 hover:text-gray-800  border-t">
                <a className="pl-5 text-sm  text-dexfi-grayviolet h-[48px] mt-1 flex hover:bg-gray-100 w-full items-center font-semibold">
                  Your NFTs
                </a>
              </li>
              <li className="whitespace-no-wrap flex items-center text-gray-600 hover:text-gray-800  border-b">
                <a className="pl-5 text-sm  text-dexfi-grayviolet h-[48px] mb-1 flex hover:bg-gray-100 w-full items-center font-semibold">
                  Make a Profile
                </a>
              </li>
              <button className="px-2 white w-full space-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-br-lg rounded-bl-lg justify-between">
                <h2 className="text-sm mx-3  text-violet-700 font-bold">
                  Disconnect
                </h2>
                <LogoutIcon
                  sx={{
                    marginLeft: '4px',
                    color: '#7645D9',
                  }}
                />
              </button>
            </ul>
          </button>
          <Modal
            disablePortal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openWallet}
            onClose={handleCloseWallet}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openWallet}>
              <Paper sx={modalstyle}>
                <MenuList
                  sx={{
                    padding: '0',
                  }}
                >
                  <div className="flex  text-xl font-bold text-dexfi-violet appBackground border-b-2  rounded-tl-3xl border-gray-200 rounded-tr-3xl">
                    <div className="p-6 flex justify-between w-full">
                      <h1 className="">Your Wallet</h1>{' '}
                      <button
                        className="hover:opacity-60 transition-opacity duration-300 cursor-pointer"
                        onClick={() => {
                          handleCloseWallet();
                        }}
                      >
                        <CloseIcon
                          sx={{
                            marginLeft: '4px',
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
                        <div className="truncate px-4">{account}</div>
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
      ) : isWeb3Loaded ? (
        <button
          className=" mr-6 text-white font-bold py-1 px-4 shadow-slate-400 shadow-sm tracking-wide bg-pink-500 rounded-full active:translate-y-0.1 active:shadow-none active:opacity-90 hover:opacity-75 transition-opacity duration-150"
          onClick={() => {
            connect(exchangeBunny.contract.address);
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <button
          className=" mr-6 text-white font-bold py-1 px-4 shadow-slate-400 shadow-sm tracking-wide bg-pink-500 rounded-full active:translate-y-0.1 active:shadow-none active:opacity-90 hover:opacity-75 transition-opacity duration-150"
          onClick={() => router.push('https://metamask.io/download.html')}
        >
          Install Metamask
        </button>
      )}
    </div>
  );
};

export default Nav;
