import { ethers } from 'ethers';
import { useState, useEffect, useRef, useCallback } from 'react'; //hooks
import { useWeb3 } from '../components/providers/web3';
import Web3 from 'web3';
import Link from 'next/link';
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

export default function Liquidity(props) {
  const {
    provider,
    registry,
    exchange2,
    web3,
    isUserWalletConnected,
    connect,
  } = useWeb3();
  const { currencies } = props;

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
          {isUserWalletConnected && userLps.length > 0 ? (
            userLps.map((currency, index) => (
              <div
                key={index}
                className="flex px-5 py-3 justify-between bg-gray-100' 
                `}
              >
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Accordion 1</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
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
          <div className="h-[100px] p-6 mx-auto text-center  ">
            <Link href="/add">
              <a>
                <button className="w-full hover:opacity-75 transition-opacity duration-150  bg-pink-500 shadow-sm text-white font-bold py-3 px-12 rounded-2xl active:translate-y-0.1 active:shadow-none active:opacity-90">
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
