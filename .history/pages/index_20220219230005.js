import { ethers } from 'ethers';
import { useState, useEffect, useRef, useCallback } from 'react'; //hooks
import axios from 'axios'; //data fetching library
import Web3Modal from 'web3modal'; //way to connect to user's wallet
import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import { useMoralis } from 'react-moralis';
import MenuItemList from '../components/MenuItemList.js';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { styled } from '@mui/material/styles';
import { useWeb3 } from '../components/providers/web3';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import ReplayIcon from '@mui/icons-material/Replay';
import MenuPanel from '../components/Exchange.js';
import {
  scammExchangeAddress,
  scammcoinAddress,
  USDCAddress,
  ETCAddress,
} from '../config.js';

const Icon = styled((props) => (
  <div {...props}>
    <div className="n py-1.3 px-1.7 rounded-full  bg-pink-500 shadow">
      <ImportExportIcon />
    </div>
    <div className="y py-1.3 px-1.7 rounded-full  bg-gray-100 shadow">
      <ArrowDownwardIcon />
    </div>
  </div>
))`
  & > .y {
    display: block;
  }
  & > .y > * {
    font-size: 1.3rem;
  }
  & > .n > * {
    font-size: 1.3rem;
    color: #fff;
  }
  & > .n {
    display: none;
  }
  &:hover > .y {
    display: none;
  }
  &:hover > .n {
    display: block;
  }
`;



export default function Home(props) {
  const { currencies } = props;

  return <MenuPanel currencies={currencies} />;
}

export async function getStaticProps() {
  const filePath = path.join(
    process.cwd(),
    'data',
    'ethereum',
    'tokenlist.json'
  );
  const jsonCurrenciesData = await fs.readFile(filePath);
  const allCurrenciesData = JSON.parse(jsonCurrenciesData);
  //map over all currencies and get their symbol, logoUri, and decimals
  //filter out the ones that symbol is BNB
  const scammCurrency = {
    symbol: 'SCAM',
    logoURI: '/logo.png',
    decimals: 18,
    address: scammcoinAddress,
  };

  const USDCCurrency = {
    symbol: 'USDC',
    logoURI: '/USDClogo.png',
    decimals: 18,
    address: USDCAddress,
  };

  const ETCCurrency = {
    symbol: 'ETC',
    logoURI: '/ETClogo.png',
    decimals: 18,
    address: ETCAddress,
  };
  const selectedCurrencies = allCurrenciesData.tokens.filter(
    ({ symbol }) =>
      symbol === 'WETH' ||
      symbol === 'USDT' ||
      symbol === 'DAI' ||
      symbol === 'MATIC' ||
      symbol === 'UNI' ||
      symbol === 'SUSHI' ||
      symbol === 'BUSD' ||
      symbol === 'AAVE' ||
      symbol === 'SHIB'
  );
  const currencies = selectedCurrencies.map(
    ({ symbol, logoURI, decimals, address }) => ({
      symbol,
      logoURI,
      decimals,
      address,
    })
  );
  currencies.unshift(scammCurrency);
  currencies.push(USDCCurrency);
  currencies.push(ETCCurrency);

  return {
    props: {
      currencies,
    },
  };
}
