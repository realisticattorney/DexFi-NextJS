import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMoralis } from 'react-moralis';
import { useEffect } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useWeb3 } from '../components/providers/web3';
import { useRouter } from 'next/router';
import ProfileMenu from './ModalMenu.js';

const Nav = () => {
  const { connect, isLoading, isWeb3Loaded, isUserWalletConnected } = useWeb3();
  const router = useRouter();
  // const { isAuthenticated, authenticate, logout } = useMoralis();

  // useEffect(() => {}, [isAuthenticated]);

  return (
    <div className="flex border-b-1.5 border-gray-200 p-0 items-center">
      <div className="p-3 pb-1.3 flex">
        <Link href="/">
          <a>
            <Image src="/bunny.svg" height={32} width={32} alt="" />
          </a>
        </Link>
        <p className="text-xl font-bold ml-2 tracking-wide hidden md:flex">BunnySwap</p>
      </div>
      <div className="relative">
        <ProfileMenu />
      </div>

      {isUserWalletConnected ? (
        <button
          className="ml-auto mr-6 text-white font-bold py-1 px-4 shadow-sm tracking-wide bg-pink-500 rounded-full"
          disabled={true}
          onClick={connect}
        >
          Welcome
        </button>
      ) : isWeb3Loaded ? (
        <button
          className="ml-auto mr-6 text-white font-bold py-1 px-4 shadow-sm tracking-wide bg-pink-500 rounded-full"
          onClick={connect}
        >
          Connect Wallet
        </button>
      ) : (
        <button
          className="ml-auto mr-6 text-white font-bold py-1 px-4 shadow-sm tracking-wide bg-pink-500 rounded-full"
          onClick={() => router.push('https://metamask.io/download.html')}
        >
          Install Metamask
        </button>
      )}
    </div>
  );
};

export default Nav;
