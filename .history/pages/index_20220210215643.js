import { ethers } from 'ethers';
import { useState, useEffect } from 'react'; //hooks
import axios from 'axios'; //data fetching library
import Web3Modal from 'web3modal'; //way to connect to user's wallet
import styled from 'styled-components';
import Image from 'next/image';
import fs from 'fs/promises';
import path from 'path';

import {
  registryAddress,
  scammExchangeAddress,
  scammcoinAddress,
} from '../config.js';

import Registry from '../artifacts/contracts/Registry.sol/Registry.json';
import Exchange from '../artifacts/contracts/Exchange.sol/Exchange.json';
import ScammCoin from '../artifacts/contracts/ScammCoin.sol/ScammCoin.json';

export default function Home(props) {
  const { currencies } = props;
  console.log(currencies);
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

  const myLoader = () =>
    `https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x3ee2200efb3400fabb9aacf31297cbdd1d435d47/logo.png`;

  return (
    <div className="flex-col ">
      <nav className="bg-white py-3 ">
        <div className="mx-auto flex  w-fit space-x-4">
          <h1>Exchange</h1>
          <h1>Liquidity</h1>
        </div>
      </nav>
      <div className="p-6 mx-auto w-min">
        <div className="flex-col py-5 w-[326px] h-[518px] bg-white rounded-3xl border ">
          <div className="text-center pb-6 border-b">
            <h1 className="text-xl font-bold tracking-wide text-dexfi-violet">
              Swap
            </h1>
            <p className="text-sm font-medium  text-dexfi-violet">
              Trade tokens in an instant
            </p>
          </div>

          <div className="flex flex-col space-y-2 p-5">
            <button>
              BNB
              <Image
                src="https://assets.trustwalletapp.com/blockchains/smartchain/assets/0x3ee2200efb3400fabb9aacf31297cbdd1d435d47/logo.png"
                height={24}
                width={24}
                quality={50}
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // const session = await getSession(context);
  const filePath = path.join(
    process.cwd(),
    'data',
    'binance',
    'tokenlist.json'
  );
  const jsonCurrenciesData = await fs.readFile(filePath);
  const allCurrenciesData = JSON.parse(jsonCurrenciesData);
  //map over all currencies and get their symbol, logoUri, and decimals
  const currencies = allCurrenciesData.map((currency) => ({
    currency.symbol,
      currency.logoUri,
      currency.decimals,
      currency.name,
  }));

  return {
    props: {
      currencies: currenciesData.tokens,
    },
  };
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
