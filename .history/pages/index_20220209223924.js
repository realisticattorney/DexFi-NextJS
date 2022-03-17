import { ethers } from 'ethers';
import { useState, useEffect } from 'react'; //hooks
import axios from 'axios'; //data fetching library
import Web3Modal from 'web3modal'; //way to connect to user's wallet
import Image from 'next/image';
import {
  registryAddress,
  scammExchangeAddress,
  scammcoinAddress,
} from '../config.js';

import Registry from '../artifacts/contracts/Registry.sol/Registry.json';
import Exchange from '../artifacts/contracts/Exchange.sol/Exchange.json';
import ScammCoin from '../artifacts/contracts/ScammCoin.sol/ScammCoin.json';

export default function Home() {
  const [exchange, setExchange] = useState(null);
  const [loadingState, setLoadingState] = useState('not-loaded');

  useEffect(() => {
    loadExchange();
  }, []);

  async function loadExchange() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    const exchange = new ethers.Contract(
      exchangeAddress,
      Exchange.abi,
      provider
    );
    setExchange(exchange);
    setLoadingState('loaded');
  }

  return (
    <div className="">
      <h1>home</h1>
    </div>
  );
}
