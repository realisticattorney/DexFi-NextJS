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
// import { useWeb3 } from "../components/providers/web3"

import {
  registryAddress,
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

import Registry from '../artifacts/contracts/Registry.sol/Registry.json';
import Exchange from '../artifacts/contracts/Exchange.sol/Exchange.json';
import ERC20Token from '../artifacts/contracts/ERC20Token.sol/ERC20Token.json';
import { display } from '@mui/system';

export default function Home(props) {
  const { web3, isInitialized } = useWeb3()
  console.log(web3)

  
  const { currencies } = props;

  const [registry, setRegistry] = useState(null);
  const [exchange, setExchange] = useState(null);
  const [loadingRegistry, setLoadingRegistry] = useState(false);
  const [inputToken, setInputToken] = useState({
    prevToken: null,
    currentToken: [currencies[0], 0],
  });
  const [outputToken, setOutputToken] = useState({
    prevToken: null,
    currentToken: [currencies[1], 1],
  });
  const currentTokenExchangeAddress = useRef(null);
  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleOpenSecond = () => setOpenSecond(true);
  const handleClose = useCallback(() => setOpen(false), []);
  const handleCloseSecond = () => setOpenSecond(false);
  const [inputOne, setInputOne] = useState(null);
  const [inputTwo, setInputTwo] = useState(null);

  const handleInputToken = useCallback(
    (current) => {
      setInputToken((t) => {
        return { prevToken: t.currentToken, currentToken: current };
      });
    },
    [setInputToken]
  );

  const handleOutputToken = useCallback(
    (current) => {
      setOutputToken((t) => {
        return { prevToken: t.currentToken, currentToken: current };
      });
    },
    [setOutputToken]
  );

  const exchangeHandler = useCallback(() => {
    if (inputToken.currentToken[1] !== 1) {
      return inputToken.currentToken[0].address;
    } else {
      return outputToken.currentToken[0].address;
    }
  }, [inputToken, outputToken]);

  const swapTypeHandler = useCallback(() => {
    if (inputToken.currentToken[1] !== 1) {
      if (outputToken.currentToken[1] !== 1) {
        return 'TokenToTokenSwap';
      } else {
        return 'TokenToEthSwap';
      }
    } else {
      return 'EthToTokenSwap';
    }
  }, [inputToken, outputToken]);

  const setExchangeCallback = useCallback((exchange) => {
    setExchange(exchange);
  }, []);

  console.log('render');
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const registry = new ethers.Contract(
      registryAddress,
      Registry.abi,
      provider
    );

    const exchange = new ethers.Contract(
      scammExchangeAddress,
      Exchange.abi,
      provider
    );

    setRegistry(registry);
    setExchange(exchange);
    currentTokenExchangeAddress.current = scammExchangeAddress;
    setLoadingRegistry(true);
  }, []);

  useEffect(() => {
    if (loadingRegistry === false) {
      return;
    }
    async function loadExchange(
      exchangeHandler,
      registry,
      setExchangeCallback
    ) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const toBeExchange = exchangeHandler();

      if (currentTokenExchangeAddress.current !== toBeExchange) {
        currentTokenExchangeAddress.current = toBeExchange;
        let newExchangeAddress = await registry.getExchange(toBeExchange);
        setExchangeCallback(
          new ethers.Contract(newExchangeAddress, Exchange.abi, provider)
        );
      }
      console.log('base exchange loaded');
    }
    loadExchange(exchangeHandler, registry, setExchangeCallback);
  }, [exchangeHandler, registry, loadingRegistry, setExchangeCallback]);

  const handleMenuItemClick = async (event, index, menuItem) => {
    if (menuItem === 1) {
      if (index === outputToken.currentToken[1]) {
        handleMenuItemSwitch(
          inputToken.currentToken[1],
          outputToken.currentToken[1]
        );
      } else {
        handleInputToken([currencies[index], index]);
      }
      handleClose();
    } else {
      if (index === inputToken.currentToken[1]) {
        handleMenuItemSwitch(
          inputToken.currentToken[1],
          outputToken.currentToken[1]
        );
      } else {
        handleOutputToken([currencies[index], index]);
      }
      handleCloseSecond();
    }
  };

  const handleMenuItemSwitch = (prevSelected, newSelected) => {
    const prevIndex = prevSelected;
    const newIndex = newSelected;
    handleInputToken([currencies[newIndex], newIndex]);
    handleOutputToken([currencies[prevIndex], prevIndex]);
  };

  const handleInputOneChange = (event) => {
    event.preventDefault();
    console.log('evento', event.target.value);
    console.log('evento target', event.target.id);
    if (event.target.value > 0) {
      callExchange(event.target.value, event.target.id);
    } else if (event.target.value === '') {
      setInputOne(null);
      setInputTwo(null);
    } else if (event.target.value === '00') {
      setInputOne(inputOne);
      setInputTwo(inputTwo);
    } else {
      setInputOne(event.target.value);
      setInputTwo(event.target.value);
    }
  };

  async function callExchange(input, id) {
    let price = await ethers.utils.parseEther(input);
    let amount;
    console.log('id', id);
    if (inputToken.currentToken[1] !== 1) {
      if (outputToken.currentToken[1] === 1) {
        amount =
          id === 'outlined-number-1'
            ? ethers.utils.formatEther(await exchange.getEthAmount(price))
            : ethers.utils.formatEther(await exchange.getTokenAmount(price));
      } else {
        amount = ethers.utils.formatEther(
          await exchange.getTokenToTokenAmount(
            price,
            outputToken.currentToken[0].address
          )
        );
      }
    } else {
      amount =
        id === 'outlined-number-1'
          ? ethers.utils.formatEther(await exchange.getTokenAmount(price))
          : ethers.utils.formatEther(await exchange.getEthAmount(price));
    }
    console.log('amount', amount);
    if (id === 'outlined-number-1') {
      setInputOne(input);
      setInputTwo(amount);
    } else {
      setInputOne(amount);
      setInputTwo(input);
    }
  }

  async function swap() {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    let currentExchangeAddress = await registry.getExchange(
      currentTokenExchangeAddress.current
    );
    const tokenUserConnection = new ethers.Contract(
      currentTokenExchangeAddress.current,
      ERC20Token.abi,
      signer
    );
    const exchangeUserConnection = new ethers.Contract(
      currentExchangeAddress,
      Exchange.abi,
      signer
    );
    const swapType = swapTypeHandler();

    if (swapType === 'EthToTokenSwap') {
      let transaction = await exchangeUserConnection.ethToTokenSwap(
        ethers.utils.parseEther((inputTwo * 0.98).toString()),
        {
          value: ethers.utils.parseEther(inputOne.toString()),
        }
      );
      console.log('transaction', transaction);
      console.log('transaction done!');
      return;
    }

    const wasApproved = await tokenUserConnection.approve(
      currentExchangeAddress,
      ethers.utils.parseEther(inputOne)
    );
    console.log('not yet confirmed');
    let waitDude = await wasApproved.wait();
    console.log('waitdudeee', waitDude);
    console.log('was approved?', wasApproved);
    const allowanceAmount = ethers.utils.formatEther(
      await tokenUserConnection.allowance(
        await signer.getAddress(),
        currentExchangeAddress
      )
    );

    console.log('allowanceAmount', allowanceAmount);

    if (allowanceAmount === '0') {
      console.log('no allowance');
      return;
    }

    if (allowanceAmount < inputOne) {
      console.log('not enough allowance');
      return;
    }

    if (swapType === 'TokenToEthSwap') {
      let transaction = await exchangeUserConnection.tokenToEthSwap(
        ethers.utils.parseEther(allowanceAmount.toString()),
        ethers.utils.parseEther((inputTwo * 0.98).toString())
      );
      console.log('transaction', transaction);
    } else {
      let minTokensAmount = ethers.utils.formatEther(
        await exchange.getTokenToTokenAmount(
          ethers.utils.parseEther(allowanceAmount.toString()),
          outputToken.currentToken[0].address
        )
      );
      console.log('minTokensAmount', minTokensAmount);
      console.log('mintype', typeof minTokensAmount);
      let transaction = await exchangeUserConnection.tokenToTokenSwap(
        ethers.utils.parseEther(allowanceAmount.toString()),
        ethers.utils.parseEther((minTokensAmount * 0.98).toString()),
        outputToken.currentToken[0].address
      );
      console.log('transaction', transaction);
    }
    console.log('transaction done!');
  }

  return (
    <div className="flex-col ">
      <nav className="bg-white">
        <div className="mx-auto flex w-fit space-x-4">
          <div className="border-b-4 pt-2.5 pb-1 px-2 border-cyan-500">
            <h1 className="text-violet-600 font-bold ">Exchange</h1>
          </div>
          <div className="pt-2.5 pb-1 px-2 ">
            <h1 className="text-gray-500 font-semibold ">Liquidity</h1>
          </div>
        </div>
      </nav>
      <div className="p-6 mx-auto w-min">
        <div className="flex-col relative py-5 w-[326px] h-[518px] bg-white rounded-3xl border shadow-sm">
          <div className="text-center pb-6 border-b">
            <h1 className="text-xl font-bold tracking-wide text-dexfi-violet">
              Swap
            </h1>
            <p className="text-sm font-medium  text-dexfi-grayviolet">
              Trade tokens in an instant
            </p>
          </div>

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
          <div className="text-center -mt-2">
            <button
              className="w-fit"
              onClick={(event) =>
                handleMenuItemClick(event, 1, outputToken.currentToken[1])
              }
            >
              <Icon
                sx={{
                  color: '#EC4899',
                  fontSize: 16,
                }}
              />
            </button>
          </div>
          { isInitialized ? "IS INIT" : "IS NOT INIT" }
          <MenuItemList
            handleOpen={handleOpenSecond}
            handleClose={handleCloseSecond}
            currencies={currencies}
            token={outputToken}
            open={openSecond}
            input={inputTwo}
            handleInputChange={handleInputOneChange}
            handleMenuItemClick={handleMenuItemClick}
            key={2}
            menuNumber={2}
            id={'outlined-number-2'}
          />
          {inputOne !== null &&
            inputTwo !== null &&
            inputOne !== '0' &&
            inputTwo !== '0' && (
              <div className="h-8">
                <div className="flex w-full justify-around">
                  <h1 className="text-xs font-bold text-dexfi-violet">Price</h1>
                  <h1 className="truncate text-sm">{`${
                    (inputOne / inputTwo).toString().length > 9
                      ? (inputOne / inputTwo).toString().substring(0, 10)
                      : (inputOne / inputTwo).toString()
                  } ${inputToken.currentToken[0].symbol} per ${
                    outputToken.currentToken[0].symbol
                  }`}</h1>
                </div>
              </div>
            )}
          <div className="h-10">
            <div className="flex w-full justify-around">
              <h1 className="text-xs1 font-bold text-violet-700 mr-20">
                Slippage tolerance
              </h1>
              <h1 className="truncate text-sm font-bold text-pink-500">0.5%</h1>
            </div>
          </div>
          <div className="px-4 absolute w-full bottom-4">
            {/* <button
              className="w-full bg-pink-500 shadow-sm text-white font-bold py-3.5 px-12 rounded-xl"
              onClick={() => {
                isAuthenticated
                  ? swap()
                  : authenticate({
                      signingMessage: 'Authorize linking of your wallet',
                    });
              }}
              // disabled={
              //   inputOne?.replace('0.', '') > 0 || inputOne === null
              //     ? true
              //     : false
              // }
            >
              {isAuthenticated ? 'Swap' : 'Connect Wallet'}
            </button> */}
            <button
              className="w-full bg-pink-500 shadow-sm text-white font-bold py-3.5 px-12 rounded-xl"
              onClick={() => swap()}
              // disabled={
              //   inputOne?.replace('0.', '') > 0 || inputOne === null
              //     ? true
              //     : false
              // }
            >
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

//dynamic server side rendering, passing the input of every exchange to the Home component as an array of objects
//this object will contain the exchange address, the exchange name, and the exchange logo, and the current price for each. lots of things, really, can we do that through metamask? idk. the other option is to get those things as the user demands for them, but pretty slow solution imo.
