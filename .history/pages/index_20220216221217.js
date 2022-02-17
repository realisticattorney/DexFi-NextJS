import { ethers } from 'ethers';
import { useState, useEffect } from 'react'; //hooks
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

export default function Home(props) {
  // const { isAuthenticated, authenticate } = useMoralis();

  // useEffect(() => {
  //   // if (isAuthenticated) router.replace("/dashboard");
  // }, [isAuthenticated]);

  const { currencies } = props;

  const [registry, setRegistry] = useState(null);
  const [exchange, setExchange] = useState(null);
  const [loadingState, setLoadingState] = useState('not-loaded');
  const [loadingRegistry, setLoadingRegistry] = useState(false);
  const [exchangeCurrency, setExchangeCurrency] = useState([currencies[0], 0]);
  const [toSwapCurrency, setToSwapCurrency] = useState([currencies[1], 1]);
  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenSecond = () => setOpenSecond(true);
  const handleClose = () => setOpen(false);
  const handleCloseSecond = () => setOpenSecond(false);
  const [wasSwitch, setWasSwap] = useState(false);

  const [swapType, setSwapType] = useState(null); //Disable Connect Wallet/Swap button if null

  const handleMenuItemClick = (event, index, menuItem) => {
    if (menuItem === 1) {
      if (index === toSwapCurrency[1]) {
        handleMenuItemSwitch(exchangeCurrency[1], toSwapCurrency[1]);
      } else {
        setExchangeCurrency([currencies[index], index]);
      }
      handleClose();
    } else {
      if (index === exchangeCurrency[1]) {
        handleMenuItemSwitch(exchangeCurrency[1], toSwapCurrency[1]);
      } else {
        setToSwapCurrency([currencies[index], index]);
      }
      handleCloseSecond();
    }
    setLoadingState('not-loaded');
  };

  const handleMenuItemSwitch = (prevSelected, newSelected) => {
    const prevIndex = prevSelected;
    const newIndex = newSelected;
    setExchangeCurrency([currencies[newIndex], newIndex]);
    setToSwapCurrency([currencies[prevIndex], prevIndex]);
  };

  const [inputOne, setInputOne] = useState(null);
  const [inputSecond, setInputSecond] = useState(null);

  const handleInputOneChange = (event) => {
    console.log('evento', event.target.value);
    console.log('evento target', event.target.id);
    if (event.target.value > 0) {
      callExchange(event.target.value, event.target.id);
    } else if (event.target.value === '') {
      setInputOne(null);
      setInputSecond(null);
    } else if (event.target.value === '00') {
      setInputOne(inputOne);
      setInputSecond(inputSecond);
    } else {
      setInputOne(event.target.value);
      setInputSecond(event.target.value);
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
    async function loadExchange(a, b, c, d, e) {
      let exchange;
      let swapType;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let exchangeTokenAddress = await c?.tokenAddress();

      console.log('exchangeTokenAddress', exchangeTokenAddress);
      let isMenuOneEth = a[1] === 1 ? 'yes' : 'no';
      let isMenuTwoEth = b[1] === 1 ? 'yes' : 'no';
      let menuOneHasChanged =
        exchangeTokenAddress === a[0].address ? 'no' : 'yes';
      let menuTwoHasChanged =
        exchangeTokenAddress === b[0].address ? 'no' : 'yes';

      console.log('botomm exchange addgress', b[0].address);

      if (isMenuOneEth === 'no') {
        //Menu one SHOULD BE THE EXCHANGE
        console.log('Menu ONE SHOULD BE THE EXCHANGE');
        if (isMenuTwoEth === 'yes') {
          console.log('And Menu TWO IS ETH');
          if (menuOneHasChanged === 'yes') {
            exchange = new ethers.Contract(
              await d.getExchange(a[0].address),
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
              await d.getExchange(a[0].address),
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
            await d.getExchange(b[0].address),
            Exchange.abi,
            provider
          );
        }
      }

      setLoadingState('loaded');
      console.log('base exchange loaded');
    }
    loadExchange(
      exchangeCurrency,
      toSwapCurrency,
      exchange,
      registry,
      swapType
    );
  }, [
    exchangeCurrency,
    toSwapCurrency,
    exchange,
    registry,
    swapType,
    loadingState,
    loadingRegistry,
  ]);

  async function callExchange(input, id) {
    // console.log('input', typeof input);
    let price = await ethers.utils.parseEther(input);
    // console.log('price', ethers.utils.formatEther(price));
    // console.log("el exchange manoooooooo",exchange);
    // console.log("lalalalalalalal", ethers.utils.formatEther(await exchange.getEthAmount(ethers.utils.parseEther("1"))))
    let amount;

    if (exchangeCurrency[1] !== 1) {
      if (toSwapCurrency[1] === 1) {
        amount =
          id === 'outlined-number-1'
            ? ethers.utils.formatEther(await exchange.getEthAmount(price))
            : ethers.utils.formatEther(await exchange.getTokenAmount(price));
        // console.log('lalalalalalalalla');
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
      setInputSecond(amount);
    } else {
      setInputOne(amount);
      setInputSecond(input);
    }
  }

  async function swap() {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    //a esta altura ya hay deployado un contrato para este par de monedas. asi que hay que conectarlo de una. lo que si estaria bueno agregar es el searchbar en el modal donde si no encuentra la moneda, puede o agregar la direccion manualmente, o incluso podria ser ah ya se, tiene que fetchear con alguna api como base de datos de monedas.
    //y una vez que clickeas en esa moneda se chequea si ya esta en el registry mapping y si no esta, se llama a la createExchange function.
    //o sea se tiene que chequear en el registry cuando se cambia el selectedIndex si currencies[selectedIndex].address esta en el registry, y si esta llamo aca al getExchangeAddress de registry
    const getExchangeAddress = await registry.getExchange(
      exchangeCurrency[0].address
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
        ethers.utils.parseEther((inputSecond * 0.98).toString())
      );
      console.log('transaction', transaction);
    }
    console.log('transaction done!');
    // if (selectedIndex !== 1) {
    //   if (selectedIndexSecond === 1) {
    //     amount =
    //       id === 'outlined-number-1'
    //         ? ethers.utils.formatEther(await exchange.getEthAmount(price))
    //         : ethers.utils.formatEther(await exchange.getTokenAmount(price));
    //   } else {
    //     amount = input;
    //   }
    // } else {
    //   amount =
    //     id === 'outlined-number-1'
    //       ? ethers.utils.formatEther(await exchange.getTokenAmount(price))
    //       : ethers.utils.formatEther(await exchange.getEthAmount(price));
    // }
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
                src={exchangeCurrency[0].logoURI}
                height={24}
                width={24}
                quality={50}
                alt=""
              />
              <h1 className="ml-1 font-bold text-dexfi-violet">
                {exchangeCurrency[0].symbol}
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
                        disabled={index === exchangeCurrency[1]}
                        selected={index === exchangeCurrency[1]}
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
                src={toSwapCurrency[0].logoURI}
                height={24}
                width={24}
                quality={50}
                alt=""
              />
              <h1 className="ml-1 font-bold text-dexfi-violet">
                {toSwapCurrency[0].symbol}
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
                        disabled={index === toSwapCurrency[1]}
                        selected={index === toSwapCurrency[1]}
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
                  value={inputSecond === null ? '' : inputSecond}
                  placeholder="0.0"
                  onChange={handleInputOneChange}
                />
              </div>
            </Box>
          </div>
          {inputOne !== null &&
            inputSecond !== null &&
            inputOne !== '0' &&
            inputSecond !== '0' && (
              <div className="h-8">
                <div className="flex w-full justify-around">
                  <h1 className="text-xs font-bold text-dexfi-violet">Price</h1>
                  <h1 className="truncate text-sm">{`${
                    (inputOne / inputSecond).toString().length > 9
                      ? (inputOne / inputSecond).toString().substring(0, 10)
                      : (inputOne / inputSecond).toString()
                  } ${exchangeCurrency[0].symbol} per ${
                    toSwapCurrency[0].symbol
                  }`}</h1>
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
