import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMoralis } from 'react-moralis';
import { useWeb3 } from '../components/providers/web3';
import { useRouter } from 'next/router';
import ModalMenu from './ModalMenu.js';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const Nav = () => {
  const { connect, isLoading, isWeb3Loaded, isUserWalletConnected, exchange2 } =
    useWeb3();
  let router = useRouter();
  const [pathname, setPathname] = useState(router.pathname);

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
        <button
          className="ml-auto mr-6 text-violet-900 font-bold py-1 px-6 shadow-slate-400 shadow-sm tracking-wide bg-gray-100 rounded-full relative hover:opacity-80 cursor-pointer"
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
          Welcome
        </button>
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
