import { ethers } from 'ethers';
import { useState, useEffect, useReducer, useCallback } from 'react'; //hooks
import axios from 'axios'; //data fetching library
import Web3Modal from 'web3modal'; //way to connect to user's wallet
import Image from 'next/image';
import fs from 'fs/promises';
import path from 'path';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useMoralis } from 'react-moralis';

const modalstyle = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 1,
  borderRadius: 9,
  p: 2,
};

import {
  registryAddress,
  scammExchangeAddress,
  scammcoinAddress,
  USDCAddress,
  USDCExchangeAddress,
  ETCAddress,
  ETCExchangeAddress,
} from '../config.js';

import Registry from '../artifacts/contracts/Registry.sol/Registry.json';
import Exchange from '../artifacts/contracts/Exchange.sol/Exchange.json';
import ScammCoin from '../artifacts/contracts/ScammCoin.sol/ScammCoin.json';
import USDC from '../artifacts/contracts/USDC.sol/USDC.json';

// function reducer(state, action) {
//   switch (action.type) {
//     case 'set_address':
//       return { ...state, address: action.payload };
//     case 'set_balance':
//       return { ...state, balance: action.payload };
//     case 'set_name':
//       return { ...state, name: action.payload };
//     default:
//       return state;
//   }
// }

export default function Home(props) {
  // const [exchangeFromReducer, dispatch] = useReducer(reducer, {
  //   prevToken: null,
  //   currentToken: [currencies[0], 0],
  // });

  const { currencies } = props;

  const [registry, setRegistry] = useState(null);
  const [exchange, setExchange] = useState(null);
  const [loadingState, setLoadingState] = useState('not-loaded');
  const [loadingRegistry, setLoadingRegistry] = useState(false);
  const [inputToken, setInputToken] = useState({
    prevToken: null,
    currentToken: [currencies[0], 0],
  });
  const [outputToken, setOutputToken] = useState({
    prevToken: null,
    currentToken: [currencies[1], 1],
  });
  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenSecond = () => setOpenSecond(true);
  const handleClose = () => setOpen(false);
  const handleCloseSecond = () => setOpenSecond(false);
  // const [wasSwitch, setWasSwitch] = useState(false);

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
    if (inputToken.currentToken[1] === inputToken.currentToken[1] 

   }, [inputToken, outputToken]);

  console.log('outputToken', outputToken);
  console.log('inputToken', inputToken);
  const [swapType, setSwapType] = useState(null); //Disable Connect Wallet/Swap button if null

  const handleMenuItemClick = async (event, index, menuItem) => {
    // let isSwitch = false;
    if (menuItem === 1) {
      if (index === outputToken.currentToken[1]) {
        handleMenuItemSwitch(
          inputToken.currentToken[1],
          outputToken.currentToken[1]
        );
        // isSwitch = true;
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
        // isSwitch = true;
      } else {
        handleOutputToken([currencies[index], index]);
      }
      handleCloseSecond();
    }
    console.log('naa');
    // if (wasSwitch && !isSwitch) {
    //   setWasSwitch(false);
    // }
    setLoadingState('not-loaded');
  };

  const handleMenuItemSwitch = (prevSelected, newSelected) => {
    console.log('is here>');
    const prevIndex = prevSelected;
    const newIndex = newSelected;
    handleInputToken([currencies[newIndex], newIndex]);
    handleOutputToken([currencies[prevIndex], prevIndex]);
    // setWasSwitch(true);
    // console.log(' handleMenuItemSwitch wasSwitch: ', wasSwitch);
  };

  const [inputOne, setInputOne] = useState(null);
  const [inputTwo, setInputTwo] = useState(null);

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
    setSwapType('tokenToEthSwap');
    setLoadingState('loaded');
    setLoadingRegistry(true);
  }, []);

  console.log('swapType', swapType);

  useEffect(() => {
    if (loadingState === 'loaded' || loadingRegistry === false) {
      return;
    }
    // console.log('wasSwitchInside', wasSwitch);
    async function loadExchange(a, b, c, d, e) {
      let isMenuTwoEth = b[1] === 1 ? 'yes' : 'no';
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // if (wasSwitch === 'ethSwitch') {
      //   if (isMenuTwoEth === 'yes') {
      //     setSwapType('TokenToEthSwap');
      //   } else {
      //     setSwapType('ethToTokenSwap');
      //   }
      //   console.log('it was switch');
      // } else if (wasSwitch === 'currencySwitch') {
      //   setExchange(
      //     new ethers.Contract(
      //       await d.getExchange(a[0].address),
      //       Exchange.abi,
      //       provider
      //     )
      //   );
      //   setSwapType('TokenToTokenSwap');
      // if (wasSwitch) {
      //   console.log('it was switch');
      // } else {
      let exchange;
      let swapType;
      let exchangeTokenAddress = await c?.tokenAddress();

      console.log('exchangeTokenAddress', exchangeTokenAddress);
      let isMenuOneEth = a[1] === 1 ? 'yes' : 'no';
      let menuOneHasChanged =
        exchangeTokenAddress === a.currentToken[0].address ? 'no' : 'yes';
      let menuTwoHasChanged =
        exchangeTokenAddress === b.currentToken[0].address ? 'no' : 'yes';

      console.log('botomm exchange addgress', b.currentToken[0].address);

      if (isMenuOneEth === 'no') {
        //Menu one SHOULD BE THE EXCHANGE
        console.log('Menu ONE SHOULD BE THE EXCHANGE');
        if (isMenuTwoEth === 'yes') {
          console.log('And Menu TWO IS ETH');
          if (menuOneHasChanged === 'yes') {
            exchange = new ethers.Contract(
              await d.getExchange(a.currentToken[0].address),
              Exchange.abi,
              provider
            );
            swapType = 'TokenToEthSwap';
            console.log('Exchange is Menu one and it has changed');
          } else {
            swapType = 'TokenToEthSwap';
            console.log(
              'Exchange is still Menu one and Menu two has changed to ETH'
            );
          }
        } else {
          //Menu one SHOULD BE THE EXCHANGE & Menu two is not ETH
          console.log('Menu ONE SHOULD BE THE EXCHANGE');
          console.log('And Menu TWO IS ANOTHER TOKEN');
          if (menuOneHasChanged === 'yes') {
            exchange = new ethers.Contract(
              await d.getExchange(a.currentToken[0].address),
              Exchange.abi,
              provider
            );
            swapType = 'TokenToTokenSwap';
          } else {
            swapType = e === 'TokenToEthSwap' ? 'TokenToTokenSwap' : null;
          }
        }
      } else {
        //Menu TWO SHOULD BE THE EXCHANGE
        console.log('Menu TWO SHOULD BE THE EXCHANGE');
        if (menuOneHasChanged === 'yes') {
          setSwapType('EthToTokenSwap');
        } else {
          exchange = new ethers.Contract(
            await d.getExchange(b.currentToken[0].address),
            Exchange.abi,
            provider
          );
        }
        // }
      }
      setLoadingState('loaded');
      console.log('base exchange loaded');
    }
    loadExchange(
      inputToken.currentToken[0].address,
      inputToken.currentToken[1],
      outputToken.currentToken[0].address,
      outputToken.currentToken[1],
      exchange,
      registry,
      swapType
    );
  }, [
    inputToken.currentToken[0].address,
    inputToken.currentToken[1],
    outputToken.currentToken[0].address,
    outputToken.currentToken[1],
    exchange,
    registry,
    swapType,
    loadingState,
    loadingRegistry,
    // wasSwitch,
  ]);

  async function callExchange(input, id) {
    let price = await ethers.utils.parseEther(input);
    let amount;

    if (inputToken.currentToken[1] !== 1) {
      if (outputToken.currentToken[1] === 1) {
        amount =
          id === 'outlined-number-1'
            ? ethers.utils.formatEther(await exchange.getEthAmount(price))
            : ethers.utils.formatEther(await exchange.getTokenAmount(price));
      } else {
        amount = input;
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
    const getExchangeAddress = await registry.getExchange(
      inputToken.currentToken[0].address
    );
    //habria que chequear si es un ERC20 o si no hace falta aprove. pero despues si hay o no aprove hecho, esta siempre en mi control porque se aprueba que mi contrato pueda o no mandar. entonces lo que deberia hacer ahora, es
    const tokenUserConnection = new ethers.Contract(
      // currencies[selectedIndex].address,
      scammcoinAddress,
      ScammCoin.abi,
      signer
    );
    const exchangeUserConnection = new ethers.Contract(
      scammExchangeAddress,
      Exchange.abi,
      signer
    );
    const wasApproved = await tokenUserConnection.approve(
      scammExchangeAddress,
      ethers.utils.parseEther(inputOne)
    );
    console.log('not yet confirmed');
    let waitDude = await wasApproved.wait();
    console.log('waitdudeee', waitDude);
    console.log('was approved?', wasApproved);

    const allowanceAmount = ethers.utils.formatEther(
      await tokenUserConnection.allowance(
        await signer.getAddress(),
        scammExchangeAddress
      )
    );
    console.log('allowanceAmount', allowanceAmount);

    if (allowanceAmount === '0') {
      console.log('no allowance');
    }

    // if (allowanceAmount < inputOne) {
    //   console.log('not enough allowance');
    // }

    if (allowanceAmount >= inputOne) {
      let transaction = await exchangeUserConnection.tokenToEthSwap(
        ethers.utils.parseEther(allowanceAmount.toString()),
        ethers.utils.parseEther((inputTwo * 0.98).toString())
      );
      console.log('transaction', transaction);
    }
    console.log('transaction done!');
  }

  return (
    <div className="flex-col ">
      <nav className="bg-white py-3 ">
        <div className="mx-auto flex  w-fit space-x-4">
          <h1>Exchange</h1>
          <h1>Liquidity</h1>
        </div>
      </nav>
      <div className="p-6 mx-auto w-min">
        <div className="flex-col relative py-5 w-[326px] h-[518px] bg-white rounded-3xl border shadow-sm">
          <div className="text-center pb-6 border-b">
            <h1 className="text-xl font-bold tracking-wide text-dexfi-violet">
              Swap
            </h1>
            <p className="text-sm font-medium  text-dexfi-violet">
              Trade tokens in an instant
            </p>
          </div>

          <div className="flex flex-col space-y-2 p-5">
            <button onClick={handleOpen} className="flex items-center">
              <Image
                src={inputToken.currentToken[0].logoURI}
                height={24}
                width={24}
                quality={50}
                alt=""
              />
              <h1 className="ml-1 font-bold text-dexfi-violet">
                {inputToken.currentToken[0].symbol}
              </h1>
              <KeyboardArrowDownIcon sx={{ color: '#280D5F', fontSize: 20 }} />
            </button>
            <Modal
              disablePortal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Paper sx={modalstyle}>
                  <MenuList>
                    <div className="flex px-3 pb-5 text-xl font-medium text-dexfi-violet border-b mb-4">
                      <h1>Select a Token</h1>
                    </div>
                    {currencies.map((currency, index) => (
                      <MenuItem
                        key={currency.symbol}
                        disabled={index === inputToken.currentToken[1]}
                        selected={index === inputToken.currentToken[1]}
                        onClick={(event) =>
                          handleMenuItemClick(event, index, 1)
                        }
                      >
                        <Image
                          src={currency.logoURI}
                          height={24}
                          width={24}
                          quality={50}
                          alt=""
                        />
                        <h1 className="ml-3">{currency.symbol}</h1>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Paper>
              </Fade>
            </Modal>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': {
                  m: 0,
                  width: '100%',
                },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  required
                  id="outlined-number-1"
                  type="number"
                  value={inputOne === null ? '' : inputOne}
                  placeholder="0.0"
                  onChange={handleInputOneChange}
                />
              </div>
            </Box>
          </div>
          {''}
          {''}
          {''}
          {''}
          {''}
          {''}
          {''}
          {''}
          {''}
          {''}
          <div className="flex flex-col space-y-2 p-5">
            <button onClick={handleOpenSecond} className="flex items-center">
              <Image
                src={outputToken.currentToken[0].logoURI}
                height={24}
                width={24}
                quality={50}
                alt=""
              />
              <h1 className="ml-1 font-bold text-dexfi-violet">
                {outputToken.currentToken[0].symbol}
              </h1>
              <KeyboardArrowDownIcon sx={{ color: '#280D5F', fontSize: 20 }} />
            </button>
            <Modal
              disablePortal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={openSecond}
              onClose={handleCloseSecond}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openSecond}>
                <Paper sx={modalstyle}>
                  <MenuList>
                    <div className="flex px-3 pb-5 text-xl font-medium text-dexfi-violet border-b mb-4">
                      <h1>Select a Token</h1>
                    </div>
                    {currencies.map((currency, index) => (
                      <MenuItem
                        key={currency.symbol}
                        disabled={index === outputToken[1]}
                        selected={index === outputToken[1]}
                        onClick={(event) =>
                          handleMenuItemClick(event, index, 2)
                        }
                      >
                        <Image
                          src={currency.logoURI}
                          height={24}
                          width={24}
                          quality={50}
                          alt=""
                        />
                        <h1 className="ml-3">{currency.symbol}</h1>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Paper>
              </Fade>
            </Modal>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': {
                  m: 0,
                  width: '100%',
                },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  required
                  id="outlined-number-2"
                  type="number"
                  value={inputTwo === null ? '' : inputTwo}
                  placeholder="0.0"
                  onChange={handleInputOneChange}
                />
              </div>
            </Box>
          </div>
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
                  } ${inputToken[0].symbol} per ${outputToken[0].symbol}`}</h1>
                </div>
              </div>
            )}
          <div className="h-10">
            <div className="flex w-full justify-around">
              <h1 className="text-xs font-bold text-dexfi-violet mr-20">
                Slippage tolerance
              </h1>
              <h1 className="truncate text-sm">0.5%</h1>
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
  // const session = await getSession(context);
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
