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
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

import {
  registryAddress,
  scammExchangeAddress,
  scammcoinAddress,
  USDCAddress,
  ETCAddress,
} from '../config.js';
import Exchange from '../artifacts/contracts/Exchange.sol/Exchange.json';

export default function Liquidity(props) {
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
  const { currencies } = props;

  const [userLps, setUserLps] = useState([]);
  console.log('userLps', userLps);

  useEffect(() => {
    if (isUserWalletConnected) {
      const promises = currencies.map(async (currency) => {
        const providerWallet = provider.request({
          method: 'eth_requestAccounts',
        });

        console.log('providerWallet', providerWallet);
        // let mappedExchangeAddress = await registry.getExchange(
        //   currency.address
        // );
        // let connectToAbi = new ethers.Contract(
        //   mappedExchangeAddress,
        //   Exchange.abi,
        //   provider
        // );
        // const lp = await connectToAbi.balanceOf(provider.address);
        // return {
        //   ...currency,
        //   lp,
        // };
      });
      // Promise.all(promises).then((lps) => {
      //   setUserLps(lps);
      // });
    }
  }, [isUserWalletConnected, currencies, provider, registry]);

  return (
    <div className="flex-col ">
      <Subnav marked={'Liquidity'} />

      <div className="p-6 mx-auto w-min">
        <div className="flex-col relative w-[436px] h-[273px] bg-white rounded-3xl border shadow-sm">
          <div className="h-[100px] p-6 justify-between flex">
            <div className="flex-col">
              <h1 className="text-xl font-bold">Your Liquidity</h1>
              <p className="text-sm">Remove liquidity to receive tokens back</p>
            </div>
            <div className="w-[80px] flex items-center justify-between">
              <button
                className="text-gray-600"
                onClick={(event) =>
                  handleMenuItemClick(event, 1, outputToken.currentToken[1])
                }
              >
                <SettingsIcon
                  sx={{
                    color: '#7c6484',
                    fontSize: 25,
                  }}
                />
              </button>
              <button
                className=""
                onClick={(event) =>
                  handleMenuItemClick(event, 1, outputToken.currentToken[1])
                }
              >
                <SettingsBackupRestoreIcon
                  sx={{
                    color: '#7c6484',
                    fontSize: 25,
                  }}
                />
              </button>
            </div>
          </div>
          {isUserWalletConnected ? (
            <div></div>
          ) : (
            <div className="h-[72px] p-6 mx-auto text-center  bg-gray-200">
              <h1 className="font-medium text-gray-600">
                Connect to a wallet to view your liquidity
              </h1>
            </div>
          )}
          <div className="h-[100px] p-6 mx-auto text-center  ">
            <Link href="/add">
              <a>
                <button className="w-full bg-pink-500 shadow-sm text-white font-bold py-3 px-12 rounded-2xl">
                  + Add Liquidity
                </button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // const filePath = path.join(
  //   process.cwd(),
  //   'data',
  //   'ethereum',
  //   'tokenlist.json'
  // );
  // const jsonCurrenciesData = await fs.readFile(filePath);
  // const allCurrenciesData = JSON.parse(jsonCurrenciesData);
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
  // const selectedCurrencies = allCurrenciesData.tokens.filter(
  //   ({ symbol }) =>
  //     symbol === 'WETH' ||
  //     symbol === 'USDT' ||
  //     symbol === 'DAI' ||
  //     symbol === 'MATIC' ||
  //     symbol === 'UNI' ||
  //     symbol === 'SUSHI' ||
  //     symbol === 'BUSD' ||
  //     symbol === 'AAVE' ||
  //     symbol === 'SHIB'
  // );
  // const currencies = selectedCurrencies.map(
  //   ({ symbol, logoURI, decimals, address }) => ({
  //     symbol,
  //     logoURI,
  //     decimals,
  //     address,
  //   })
  // );
  const currencies = [scammCurrency, USDCCurrency, ETCCurrency];
  // currencies.unshift(scammCurrency);
  // currencies.push(USDCCurrency);
  // currencies.push(ETCCurrency);

  return {
    props: {
      currencies,
    },
  };
}
