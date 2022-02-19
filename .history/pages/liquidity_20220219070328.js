import { ethers } from 'ethers';
import { useState, useEffect, useRef, useCallback } from 'react'; //hooks
import axios from 'axios'; //data fetching library
import Web3Modal from 'web3modal'; //way to connect to user's wallet
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { useWeb3 } from '../components/providers/web3';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Liquidity() {
  const {
    provider,
    registry,
    exchange2,
    web3,
    isUserWalletConnected,
    connect,
  } = useWeb3();
  console.log('provider', provider);
  console.log('web3', web3);

  return ( <div className="flex-col ">
  <nav className="bg-white">
    <div className="mx-auto flex w-fit space-x-4">
      <div className="border-b-4 pt-2.5 pb-1 px-2 border-cyan-500">
        <h1 className="text-violet-600 font-bold ">Exchange</h1>
      </div>
      <div className="pt-2.5 pb-1 px-2 ">
        <Link href="/liquidity">
          <a className="text-gray-500 font-semibold ">Liquidity</a>
        </Link>
      </div>
    </div>
  </nav>);
}
