import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMoralis } from 'react-moralis';
import { useEffect } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useWeb3 } from '../components/providers/web3';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const modalstyle = {
  width: 400,
  bgcolor: 'background.white',
  boxShadow: 1,
  borderRadius: 9,
  p: 2,
};


const Nav = () => {
  const { connect, isLoading, isWeb3Loaded, isUserWalletConnected } = useWeb3();
  const router = useRouter();
  // const { isAuthenticated, authenticate, logout } = useMoralis();

  // useEffect(() => {}, [isAuthenticated]);

  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }



  function handleClose() {
    setAnchorEl(null);
  }
  return (
    <div className="flex border-b-1.5 border-gray-200 p-0 items-center">
      <div className="p-3 pb-1.3 mr-8">
        <Link href="/">
          <a>
            <Image src="/bunny.svg" height={32} width={32} alt="" />
          </a>
        </Link>
      </div>
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          onMouseOver={handleClick}
        >
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          sx={modalstyle}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{ onMouseLeave: handleClose }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
      <Link href="/swap">
        <a className="mr-6 text-gray-500 font-semibold">Trade</a>
      </Link>
      <Link href="/farms">
        <a className="mr-6 text-gray-500  font-semibold">Earn</a>
      </Link>
      <Link href="/liquidity">
        <a className="mr-6 text-gray-500  font-semibold">Win</a>
      </Link>
      <Link href="/liquidity">
        <a className="mr-6 text-gray-500  font-semibold">NFT</a>
      </Link>
      <Link href="/liquidity">
        <a className="mr-6 text-gray-500  font-semibold">
          <MoreHorizIcon sx={{ color: '#6B7280', fontSize: 20 }} />
        </a>
      </Link>
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
