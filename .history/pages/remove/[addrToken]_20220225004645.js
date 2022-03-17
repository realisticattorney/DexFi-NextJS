import { ethers } from 'ethers';
import { useState, useEffect, useRef, useCallback } from 'react'; //hooks
import { useWeb3 } from '../../components/providers/web3';
import fs from 'fs/promises';
import path from 'path';
import { scammcoinAddress, USDCAddress, ETCAddress } from '../../config.js';

const Remove = ({ address, currency }) => {
  const {
    provider,
    registry,
    exchange2,
    web3,
    isUserWalletConnected,
    connect,
  } = useWeb3();

  console.log('address', address);
  console.log('currency', currency);
  useEffect(() => {}, [address, currency]);

  return (
    <div className="flex-col ">
    <div className="p-6 mx-auto w-min">
      <div className="flex-col relative w-[436px] h-[626px] bg-white rounded-3xl border shadow-sm">
        <AddUpperSection />
      </div>
    </div>
  </div>
  );
};

export default Remove;

export async function getServerSideProps(context) {
  const { addrToken } = context.query;
  const [address, token] = addrToken.split('_');

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

  const currencies = [scammCurrency, USDCCurrency, ETCCurrency];

  const currency = currencies.find(({ symbol }) => symbol === token);

  return {
    props: {
      address,
      currency,
    },
  };
}

// const filePath = path.join(
//   process.cwd(),
//   'data',
//   'ethereum',
//   'tokenlist.json'
// );
// const jsonCurrenciesData = await fs.readFile(filePath);
// const allCurrenciesData = JSON.parse(jsonCurrenciesData);

// const selectedCurrency = allCurrenciesData.tokens.filter(
//   ({ symbol }) => symbol === "WETH"
// );

// const formattedCurrency = selectedCurrency.map(
//   ({ symbol, logoURI, decimals, address }) => ({
//     symbol,
//     logoURI,
//     decimals,
//     address,
//   })
// );
