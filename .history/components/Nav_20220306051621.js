import { useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';
import Link from 'next/link';
import Image from 'next/image';
import { useWeb3 } from '../components/providers/web3';
import { useAccount } from '../components/web3/hooks/useAccount';
import { useNetwork } from '../components/web3/hooks/useNetwork';
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
import ERC20Token from '../utils/ERC20Token.json';
import { scammcoinAddress } from '../config-local.js';
import { useMoralis, useMoralisWeb3Api, useERC20Balances } from 'react-moralis';
import Moralis from 'moralis';
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
  const { connect, isWeb3Loaded, exchangeBunny, provider, hasWallet } =
    useWeb3();
  const Web3Api = useMoralisWeb3Api();
  let router = useRouter();
  const [pathname, setPathname] = useState(router.pathname);
  const { contract, balance, reserve } = exchangeBunny ?? {};
  const { address } = contract ?? {};
  const [openWallet, setOpenWallet] = useState(false);
  const handleOpenWallet = useCallback(() => setOpenWallet(true), []);
  const handleCloseWallet = useCallback(() => setOpenWallet(false), []);
  const {
    isAuthenticated,
    isInitialized,
    connector,
    authenticate,
    user,
    logout,
  } = useMoralis();
  console.log('user', user);
  console.log('isAuthenticated', isAuthenticated);
  console.log('isInitialized', isInitialized);
  console.log('connector', connector);
  console.log('balance', balance);
  console.log('reserve', reserve);
  // console.log("something something", Moralis.Web3API.token.getTokenPrice(scammcoinAddress));
  const ethAccountBalance = useCallback(async () => {
    if (user && provider) {
      const ScammCoinAbi = new ethers.Contract(
        scammcoinAddress,
        ERC20Token.abi,
        provider
      );

      const result = await Web3Api.account
        .getNativeBalance({
          chain: 'rinkeby',
          address: user.get('ethAddress'),
        })
        .catch((e) => console.log(e));
      if (result.balance) {
        return [
          Moralis.Units.FromWei(result.balance),
          ethers.utils.formatEther(
            await ScammCoinAbi.balanceOf(user.get('ethAddress'))
          ),
        ];
      }
    }
  }, [user, provider, Web3Api.account]);

  const [accountBalance, setAccountBalance] = useState(0);
  useEffect(() => {
    async function getEthAccountBalance() {
      setAccountBalance(await ethAccountBalance());
    }
    getEthAccountBalance();
  }, [ethAccountBalance]);

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
        <Link href={`/swap`} passHref>
          <div className="flex mx-5 space-x-2 cursor-pointer scaleFirstChild  ">
            <Image src="/logo.png" height={24} width={26} alt="" className="" />
            <h2 className="text-dexfi-grayviolet mt-0.1 pt-0.1 font-bold">
              ${reserve ? (reserve / balance).toFixed(2) : '0.00'}
            </h2>
          </div>
        </Link>
        <Settings />
      </div>
      {isAuthenticated ? (
        <>
          <div
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
              <div className="truncate">{user.get('ethAddress')}</div>
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
              <button
                className="px-2 white w-full space-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-br-lg rounded-bl-lg justify-between"
                onClick={logout}
              >
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
          </div>
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
                      <h2 className="bg-gray-100 py-2 rounded-2xl text-dexfi-violet font-bold text-center mb-3">
                        <div className="truncate px-4">
                          {user.get('ethAddress')}
                        </div>
                      </h2>
                      {accountBalance && parseInt(accountBalance[1]) < 0.1 && (
                        <div className="p-4 bg-orange-50 border border-orange-300 rounded-xl">
                          <div className="flex">
                            <WarningIcon
                              sx={{
                                fontSize: 24,
                                color: '#FFB237',
                              }}
                            />
                            <div className="ml-3">
                              <h1 className="text-dexfi-violet font-bold">
                                ETH Balance Low
                              </h1>
                              <h1 className="text-dexfi-violet font-medium">
                                Your need ETH for transaction fees.
                              </h1>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex justify-between mt-3">
                        <h2 className="text-dexfi-grayviolet font-medium">
                          SCAM Balance
                        </h2>
                        {accountBalance && (
                          <h2 className="text-dexfi-violet font-medium">
                            {parseInt(accountBalance[1]).toFixed(2)}
                          </h2>
                        )}
                      </div>
                      <div className="flex justify-between">
                        <h2 className="text-dexfi-grayviolet font-medium">
                          ETH Balance
                        </h2>
                        {accountBalance && (
                          <h2 className="text-dexfi-violet font-medium">
                            {parseInt(accountBalance[0]).toFixed(2)}
                          </h2>
                        )}
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
                        onClick={logout}
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
      ) : isInitialized ? (
        <button
          className=" mr-6 text-white font-bold py-1 px-4 shadow-slate-400 shadow-sm tracking-wide bg-pink-500 rounded-full active:translate-y-0.1 active:shadow-none active:opacity-90 hover:opacity-75 transition-opacity duration-150"
          onClick={() => authenticate()}
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
