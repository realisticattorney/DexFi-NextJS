import { useState, useCallback } from 'react';
import { useWeb3 } from '../components/providers/web3';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Subnav from '../components/Subnav';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuItemList from '../components/MenuItemList';

export default function Add(props) {
  const { currencies } = props;
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

  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleOpenSecond = () => setOpenSecond(true);
  const handleClose = useCallback(() => setOpen(false), []);
  const handleCloseSecond = () => setOpenSecond(false);
  const [inputOne, setInputOne] = useState(null);
  const [inputTwo, setInputTwo] = useState(null);
  useState(false);
  const [inputToken, setInputToken] = useState({
    prevToken: null,
    currentToken: [currencies[0], 0],
  });
  const [outputToken, setOutputToken] = useState({
    prevToken: null,
    currentToken: [currencies[1], 1],
  });

  return (
    <div className="flex-col ">
      <div className="p-6 mx-auto w-min">
        <div className="flex-col relative w-[436px] h-[273px] bg-white rounded-3xl border shadow-sm">
          <div className="h-[100px] p-6 justify-between flex border-b">
            <div className="flex items-center -mr-9">
              <Link href="/liquidity">
                <a>
                  <ArrowBackIcon
                    sx={{
                      color: '#7c6484',
                      fontSize: 33,
                      fontWeight: 'bold',
                    }}
                  />
                </a>
              </Link>
            </div>
            <div className="flex-col">
              <h1 className="text-xl font-bold mb-1">Add Liquidity</h1>
              <p className="text-sm">Add liquidity to receive LP tokens</p>
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
          {/*  */}
          {/*  */}
          <MenuItemList
            handleOpen={handleOpen}
            handleClose={handleClose}
            currencies={currencies}
            token={inputToken}
            open={open}
            input={inputOne}
            handleInputChange={handleInputOneChange}
            handleMenuItemClick={handleMenuItemClick}
            key={1}
            menuNumber={1}
            id={'outlined-number-1'}
          />

          <div className="h-[100px] p-6 mx-auto text-center  ">
            <Link href="/add">
              <a>
                <button className="w-full bg-pink-500 shadow-sm text-white font-bold py-3 px-12 rounded-2xl">
                  Connect Wallet
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
