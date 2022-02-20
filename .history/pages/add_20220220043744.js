import { useState, useCallback } from 'react';
import { useWeb3 } from '../components/providers/web3';
import { useRouter } from 'next/router';
import fs from 'fs/promises';
import path from 'path';

import { scammcoinAddress, USDCAddress, ETCAddress } from '../config.js';
import AddLiquidityPanel from '../components/AddLiquidityPanel';
import Link from 'next/link';

export default function Add(props) {
  const { currencies } = props;

  return (
    <div className="flex-col ">
      <div className="p-6 mx-auto w-min">
        <div className="flex-col relative w-[436px] h-[273px] bg-white rounded-3xl border shadow-sm">
          <AddLiquidityPanel />

          <div className="px-4 absolute w-full bottom-4">
            <button className="w-full bg-pink-500 shadow-sm text-white font-bold py-3 px-12 rounded-2xl">
              Connect Wallet
            </button>
          </div>
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
