import { ethers } from 'ethers';
import { useState, useEffect } from 'react'; //hooks
import axios from 'axios'; //data fetching library
import Web3Modal from 'web3modal'; //way to connect to user's wallet
import Image from 'next/image';
import {
  registryAddress,
  exchangeAddress,
  scammcoinAddress,
} from '../config.js';

import Registry from '../artifacts/contracts/Registry.sol/Registry.json';
import Exchange from '../artifacts/contracts/Exchange.sol/Exchange.json';

export default function Home() {
  const [exchange, setExchange] = useState(null);
  const [loadingState, setLoadingState] = useState('not-loaded');

  return (<div className="">
  home</div>);
}
