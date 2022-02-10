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
      scammExchangeAddress,
      Exchange.abi,
      provider
    );
    setExchange(exchange);
    setLoadingState('loaded');
  }

  return (
    <div className="p-4 flex-col mx-auto w-min ">
    <div className=''>
      <h1>home</h1>
      <div className="h-56 w-32 bg-white "></div>

    </div>
    </div>
  );
}

//dynamic server side rendering, passing the input of every exchange to the Home component as an array of objects
//this object will contain the exchange address, the exchange name, and the exchange logo, and the current price for each. lots of things, really, can we do that through metamask? idk. the other option is to get those things as the user demands for them, but pretty slow solution imo.

//then the button SCAMM will render this popover where you can pick the token to-trade

// const registry = new ethers.Contract(
//   registryAddress,
//   Registry.abi,
//   provider
// );
// const getExchangeAddress = await registry.getExchange(scammAddress);

// if (getExchangeAddress === '0x0000000000000000000000000000000000000000') {
//   const exchangeAddress = await registry.createExchange(scammAddress);
// }
