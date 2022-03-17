import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMoralis } from 'react-moralis';
import { useWeb3 } from '../components/providers/web3';
import { useRouter } from 'next/router';
import ModalMenu from './ModalMenu.js';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
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

const Nav = () => {
  const { connect, isLoading, isWeb3Loaded, isUserWalletConnected, exchange2 } =
    useWeb3();
  let router = useRouter();
  const [pathname, setPathname] = useState(router.pathname);

  const [openWallet, setOpenWallet] = useState(false);
  const handleOpenWallet = useCallback(() => setOpenWallet(true), []);
  const handleCloseWallet = useCallback(() => setOpenWallet(false), []);

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

      {isUserWalletConnected ? (
        <>
          <button
            className="ml-auto mr-4 text-violet-900 font-bold py-0.8 px-6 shadow-slate-400 shadow-sm tracking-wide bg-gray-100 rounded-full relative  group hover:opacity-80 cursor-pointer"
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
            <div>
              Welcome
              <KeyboardArrowDownIcon
                sx={{
                  marginRight: '-18px',
                }}
              />
            </div>
            <ul className="absolute right-0 top-0 mt-8 py-1  w-[280px] rounded-2xl border shadow-sm bg-white z-10 hidden group-hover:block">
              <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
                <Link href="/farms">
                  <a className="text-sm mx-3 text-v font-semibold">Wallet</a>
                </Link>
              </li>
              <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
                <Link href="/pools">
                  <a className="text-sm mx-3 text-v font-semibold">Recent Transactions</a>
                </Link>
              </li>
          
              <li className="whitespace-no-wrap flex items-center text-gray-600 hover:text-gray-800  border-t">
                <Link href="/pools">
                  <a className="pl-5 text-gray-500 h-[48px] mt-1 flex hover:bg-gray-100 w-full items-center font-semibold">
                    Your NFTs
                  </a>
                </Link>
              </li>
              <li className="whitespace-no-wrap flex items-center text-gray-600 hover:text-gray-800  border-b">
                <Link href="/pools">
                  <a className="pl-5 text-gray-500 h-[48px] mb-1 flex hover:bg-gray-100 w-full items-center font-semibold">
                    Make a Profile
                  </a>
                </Link>
              </li>
              <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
                <Link href="/pools">
                  <a className="text-sm mx-3 text-v font-semibold">Disconnect</a>
                </Link>
              </li>
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
                <MenuList>
                  <div className="flex px-3 pb-5 text-xl font-medium text-dexfi-violet border-b mb-4">
                    <h1>Select a Token</h1>
                  </div>
                  {/* {currencies.map((currency, index) => (
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
              ))} */}
                </MenuList>
              </Paper>
            </Fade>
          </Modal>
        </>
      ) : isWeb3Loaded ? (
        <button
          className="ml-auto mr-6 text-white font-bold py-1 px-4 shadow-slate-400 shadow-sm tracking-wide bg-pink-500 rounded-full"
          onClick={() => {
            connect(exchange2.address);
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <button
          className="ml-auto mr-6 text-white font-bold py-1 px-4 shadow-slate-400 shadow-sm tracking-wide bg-pink-500 rounded-full"
          onClick={() => router.push('https://metamask.io/download.html')}
        >
          Install Metamask
        </button>
      )}
    </div>
  );
};

export default Nav;
