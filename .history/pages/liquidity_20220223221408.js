import { ethers } from 'ethers';
import { useState, useEffect, useRef, useCallback } from 'react'; //hooks
import { useWeb3 } from '../components/providers/web3';
import Web3 from 'web3';
import fs from 'fs/promises';
import Link from 'next/link';
import path from 'path';
import Subnav from '../components/Subnav';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { scammcoinAddress, USDCAddress, ETCAddress } from '../config.js';
import Exchange from '../artifacts/contracts/Exchange.sol/Exchange.json';
import Image from 'next/image';
import Settings from '../components/Settings';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  hideBorder: {
    '&.MuiAccordion-root': {
      boxShadow: 'none',
      borderRadius: 6,
    },
  },
});

export default function Liquidity(props) {
  const {
    provider,
    registry,
    exchange2,
    web3,
    isUserWalletConnected,
    connect,
  } = useWeb3();
  const { currencies, backedCurrency } = props;

  const classes = useStyles();
  const [userLps, setUserLps] = useState([]);

  useEffect(() => {
    if (isUserWalletConnected && userLps.length === 0) {
      const promises = currencies.map(async (currency) => {
        ethereum.enable();
        const providerAccounts = new Web3(window.ethereum);
        window.ethereum.enable().catch((error) => {
          // User denied account access
          console.log(error);
        });
        const [account] = await providerAccounts.eth.getAccounts();

        let mappedExchangeAddress = await registry.getExchange(
          currency.address
        );
        let connectToAbi = new ethers.Contract(
          mappedExchangeAddress,
          Exchange.abi,
          provider
        );
        const userLPTokens = ethers.utils.formatEther(
          await connectToAbi.balanceOf(account)
        );

        return {
          ...currency,
          userLPTokens,
        };
      });
      Promise.all(promises).then((lps) => {
        setUserLps(lps);
      });
    }
  }, [isUserWalletConnected, currencies, provider, registry, userLps.length]);

  return (
    <div className="flex-col ">
      <Subnav marked={'Liquidity'} />

      <div className="p-6 mx-auto w-min">
        <div className="flex-col relative w-[436px] min-h-[273px] bg-white rounded-3xl border shadow-sm">
          <div className="h-[100px] p-6 justify-between flex">
            <div className="flex-col">
              <h1 className="text-xl font-bold">Your Liquidity</h1>
              <p className="text-sm">Remove liquidity to receive tokens back</p>
            </div>
            <div className="w-[80px] flex items-center justify-between">
              <Settings />
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
          <div className="bg-dexfi-backgroundgray py-4 px-6">
            {isUserWalletConnected && userLps.length > 0 ? (
              userLps.map((currency, index) => (
                <div key={index} className=" py-2 justify-between ">
                  <Accordion className={classes.hideBorder}>
                    <AccordionSummary
                      className={classes.hideBorder}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      sx={{
                        boxShadow: 0,
                      }}
                    >
                      <div className="flex flex-col py-1">
                        <div className="flex space-x-1">
                          <div>
                            <Image
                              src={currency.logoURI}
                              height={24}
                              width={24}
                              quality={50}
                              alt=""
                            />
                          </div>
                          <div>
                            <Image
                              src={backedCurrency[0].logoURI}
                              height={24}
                              width={24}
                              quality={50}
                              alt=""
                            />
                          </div>
                          <h1 className="ml-2 font-bold text-dexfi-violet">
                            {currency.symbol}/{backedCurrency[0].symbol}
                          </h1>
                        </div>
                        <p className="font-medium text-xs1 text-dexfi-grayviolet">
                          {currency.userLPTokens}
                        </p>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="flex flex-col py-1">
                        <div className="flex justify-between mb-1.5">
                          <div className="flex">
                            <Image
                              src={currency.logoURI}
                              height={20}
                              width={20}
                              quality={50}
                              alt=""
                            />
                            <h1 className="ml-2 font-medium text-sm text-dexfi-grayviolet">
                              Pooled {currency.symbol}
                            </h1>
                          </div>
                          <p className="font-medium text-sm text-dexfi-grayviolet">
                            {currency.userLPTokens}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex">
                            <Image
                              src={backedCurrency[0].logoURI}
                              height={20}
                              width={20}
                              quality={50}
                              alt=""
                            />
                            <h1 className="ml-2 font-medium text-sm text-dexfi-grayviolet">
                              Pooled {backedCurrency[0].symbol}
                            </h1>
                          </div>
                          <p className="font-medium text-sm text-dexfi-grayviolet">
                            {currency.userLPTokens}
                          </p>
                        </div>
                        <div className="flex justify-between mt-1.5">
                          <h1 className="font-medium text-sm text-dexfi-grayviolet">
                            Share of pool
                          </h1>
                          <p className="font-medium text-sm text-dexfi-grayviolet">
                            {'<'}0.01%
                          </p>
                        </div>
                        <button className="w-full hover:opacity-75 transition-opacity duration-150 mt-2.5 text-sm  bg-pink-500 shadow-sm text-white font-bold py-2.5 px-12 rounded-xl active:translate-y-0.1 active:shadow-none active:opacity-90">
                          Remove
                        </button>
                        <button className="w-full hover:opacity-75 transition-opacity duration-150 mt-5 text-sm  text-pink-500 font-bold rounded-2xl active:translate-y-0.1 active:shadow-none active:opacity-90">
                          + Add liquidity instead
                        </button>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))
            ) : (
              <div className="h-[72px] p-6 mx-auto text-center  bg-gray-200">
                <h1 className="font-medium text-gray-600">
                  Connect to a wallet to view your liquidity
                </h1>
              </div>
            )}
            <div className='h-[80px] flex flex-col text-center p-4'>
            <p className='text-sm font-medium text-dexfi-grayviolet'>Don{"'"}t see a pool you joined?</p>
            <Link href="/swap">
              <a>
                <button className="w-fit mt-1.5 border-pink-500 border-2 font-bold py-0.5 px-4 rounded-3xl shadow-sm text-sm text-pink-500 hover:opacity-75 transition-opacity duration-300 active:translate-y-0.1 active:shadow-none active:opacity-90">
                  Find other LP tokens
                </button>
              </a>
            </Link>
            </div>
          </div>
          <div className="h-[100px] py-3 px-6 mx-auto flex items-center text-center ">
            <Link href="/add">
              <a>
                <button className="w-full hover:opacity-75  transition-opacity duration-150  bg-pink-500 shadow-sm text-white font-bold py-3 px-12 rounded-2xl active:translate-y-0.1 active:shadow-none active:opacity-90">
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
  const filePath = path.join(
    process.cwd(),
    'data',
    'ethereum',
    'tokenlist.json'
  );
  const jsonCurrenciesData = await fs.readFile(filePath);
  const allCurrenciesData = JSON.parse(jsonCurrenciesData);
  // map over all currencies and get their symbol, logoUri, and decimals
  // filter out the ones that symbol is BNB
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
    ({ symbol }) => symbol === 'WETH'
  );
  const backedCurrency = selectedCurrencies.map(
    ({ symbol, logoURI, decimals, address }) => ({
      symbol,
      logoURI,
      decimals,
      address,
    })
  );
  const currencies = [scammCurrency, USDCCurrency, ETCCurrency];
  // currencies.unshift(scammCurrency);
  // currencies.push(USDCCurrency);
  // currencies.push(ETCCurrency);

  return {
    props: {
      currencies,
      backedCurrency,
    },
  };
}

{
  /* <Image
                    src={currency.logoURI}
                    height={24}
                    width={24}
                    quality={50}
                    alt=""
                  />
                  <h1 className="ml-2 font-semibold text-dexfi-violet">
                    {currency.symbol}
                  </h1>
                </div>
                <p className="ml-3 font-bold text-violet-900">
                  ${currency.userLPTokens}
                </p> */
}
