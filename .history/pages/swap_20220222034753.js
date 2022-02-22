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
import MenuPanel from '../components/MenuPanel.js';

import { scammcoinAddress, USDCAddress, ETCAddress } from '../config.js';
import Subnav from '../components/Subnav.js';
import SwapUpperSection from '../components/SwapUpperSection.js';

export default function Swap(props) {
  const { currencies } = props;

  return (
    <div className="flex-col ">
      <Subnav marked={'Exchange'} />
      <div className="p-6 mx-auto w-min h-screen -mb-[100px]">
        <div className="flex-col relative py-5 w-[326px] h-[518px] bg-white rounded-3xl border shadow-sm">
          <SwapUpperSection />
          <MenuPanel currencies={currencies} section={'swap'} />
        </div>
        <div className='absolute bottom-0 right-10 '>
        <Image src="/help.png" width={240} height={162} alt="lol" />
        </div>
      </div>
    </div>
  );
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
