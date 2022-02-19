import { ethers } from 'ethers';
import { useState, useEffect, useRef, useCallback } from 'react'; //hooks
import axios from 'axios'; //data fetching library
import Web3Modal from 'web3modal'; //way to connect to user's wallet
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { useWeb3 } from '../components/providers/web3';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Subnav from '../components/Subnav';

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

  return (
    <div className="flex-col ">
      <Subnav marked={'Liquidity'} />

      <div className="p-6 mx-auto w-min">
        <div className="flex-col relative w-[436px] h-[273px] bg-white rounded-3xl border shadow-sm">
          <div className="h-[100px] p-6 justify-around flex">
            <div className='flex-col'>
              <h1 className="text-xl font-bold">Your Liquidity</h1>
              <p className="text-sm">Remove liquidity to receive tokens back</p>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
