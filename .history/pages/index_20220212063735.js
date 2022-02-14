import { ethers } from 'ethers';
import { useState, useEffect } from 'react'; //hooks
import axios from 'axios'; //data fetching library
import Web3Modal from 'web3modal'; //way to connect to user's wallet
import styled from 'styled-components';
import Image from 'next/image';
import fs from 'fs/promises';
import path from 'path';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
} from '../config.js';

import Registry from '../artifacts/contracts/Registry.sol/Registry.json';
import Exchange from '../artifacts/contracts/Exchange.sol/Exchange.json';
import ScammCoin from '../artifacts/contracts/ScammCoin.sol/ScammCoin.json';

export default function Home(props) {
  const { currencies } = props;
  // console.log(currencies);

  const [registry, setRegistry] = useState(null);
  const [exchange, setExchange] = useState(null);
  const [loadingState, setLoadingState] = useState('not-loaded');

  const [exchangeCurrency, setExchangeCurrency] = useState(currencies[0]);
  const [toSwapCurrency, setToSwapCurrency] = useState(currencies[1]);

  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenSecond = () => setOpenSecond(true);
  const handleClose = () => setOpen(false);
  const handleCloseSecond = () => setOpenSecond(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndexSecond, setSelectedIndexSecond] = useState(1);

  const handleMenuItemClick = (event, index) => {
    if (index === selectedIndexSecond) {
      const prevIndex = selectedIndex;
      const newIndex = selectedIndexSecond;
      setSelectedIndex(newIndex);
      setSelectedIndexSecond(prevIndex);
      setToSwapCurrency(currencies[prevIndex]);
      setExchangeCurrency(currencies[newIndex]);
    } else {
      setSelectedIndex(index);
      setExchangeCurrency(currencies[index]);
    }
    handleClose();
  };

  const handleMenuItemClickSecond = (event, index) => {
    if (index === selectedIndex) {
      const prevIndex = selectedIndexSecond;
      const newIndex = selectedIndex;
      setSelectedIndex(prevIndex);
      setSelectedIndexSecond(newIndex);
      setToSwapCurrency(currencies[newIndex]);
      setExchangeCurrency(currencies[prevIndex]);
    } else {
      setSelectedIndexSecond(index);
      setToSwapCurrency(currencies[index]);
    }
    handleCloseSecond();
  };

  const [inputOne, setInputOne] = useState(null);
  const [inputSecond, setInputSecond] = useState(null);

  const handleInputOneChange = (event) => {
    console.log(event.target.value);
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
    loadExchange();
  }, []);

  async function loadExchange() {
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
    setExchange(exchange);
    setRegistry(registry);
    setLoadingState('loaded');
  }

  async function callExchange(input, id) {
    const price = ethers.utils.parseEther(input.toString());
    console.log(exchange);
    let amount;

    if (selectedIndex !== 1) {
      if (selectedIndexSecond === 1) {
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
    //esto tiene que conectarse de una. y si la persona no lo activa. deberia estar como en un condicional si lo activo o no antes de llamar a este swap. por lo que este swap deberia estar dentro de una funcion que primer chequea eso, sino estoy repitiendo la conexion cada vez que hago el swap a pesar de que...bah capaz no. osea cuantos swaps vas a hacer.

    //a esta altura ya hay deployado un contrato para este par de monedas. asi que hay que conectarlo de una. lo que si estaria bueno agregar es el searchbar en el modal donde si no encuentra la moneda, puede o agregar la direccion manualmente, o incluso podria ser ah ya se, tiene que fetchear con alguna api como base de datos de monedas.
    //y una vez que clickeas en esa moneda se chequea si ya esta en el registry mapping y si no esta, se llama a la createExchange function.
    //o sea se tiene que chequear en el registry cuando se cambia el selectedIndex si currencies[selectedIndex].address esta en el registry, y si esta llamo aca al getExchangeAddress de registry
    const getExchangeAddress = await registry.getExchange(
      currencies[selectedIndex].address
    );
//habria que chequear si es un ERC20 o si no hace falta aprove. pero despues si hay o no aprove hecho, esta siempre en mi control porque se aprueba que mi contrato pueda o no mandar. entonces lo que deberia hacer ahora, es 
    const tokenUserConnection = new ethers.Contract(
      currencies[selectedIndex].address,
      Token.abi,
      signer
    );

    const exchangeUserConnection = new ethers.Contract(
      getExchangeAddress,
      Exchange.abi,
      signer
    );

    let transaction = await contract.swap(
      ethers.utils.parseEther(inputOne),
      ethers.utils.parseEther(inputSecond)
    );
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
                src={exchangeCurrency.logoURI}
                height={24}
                width={24}
                quality={50}
                alt=""
              />
              <h1 className="ml-1 font-bold text-dexfi-violet">
                {exchangeCurrency.symbol}
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
                        disabled={index === selectedIndex}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
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
                src={toSwapCurrency.logoURI}
                height={24}
                width={24}
                quality={50}
                alt=""
              />
              <h1 className="ml-1 font-bold text-dexfi-violet">
                {toSwapCurrency.symbol}
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
                        disabled={index === selectedIndexSecond}
                        selected={index === selectedIndexSecond}
                        onClick={(event) =>
                          handleMenuItemClickSecond(event, index)
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
                  } ${currencies[selectedIndex].symbol} per ${
                    currencies[selectedIndexSecond].symbol
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
            <button
              className="w-full bg-pink-500 shadow-sm text-white font-bold py-3.5 px-12 rounded-xl"
              onClick={() => swap()}
              disabled={
                inputOne > 0 ? true : inputOne === '0' || inputSecond === '0'}
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
