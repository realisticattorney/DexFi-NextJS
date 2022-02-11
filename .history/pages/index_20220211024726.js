import { ethers } from 'ethers';
import { useState, useEffect } from 'react'; //hooks
import axios from 'axios'; //data fetching library
import Web3Modal from 'web3modal'; //way to connect to user's wallet
import styled from 'styled-components';
import Image from 'next/image';
import fs from 'fs/promises';
import path from 'path';
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';

const options = [
  'Show some love to MUI',
  'Show all notification content',
  'Hide sensitive notification content',
  'Hide all notification content',
];

const modalstyle = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
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
  console.log(currencies);

  const [exchange, setExchange] = useState(null);
  const [loadingState, setLoadingState] = useState('not-loaded');

  const [exchangeCurrency, setExchangeCurrency] = useState(currencies[0]);
  const [toSwapCurrency, setToSwapCurrency] = useState(currencies[1]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  // const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    handleClose()
  };


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
            <Button onClick={handleOpen} className="flex">
              <Image
                src={exchangeCurrency.logoURI}
                height={24}
                width={24}
                quality={50}
                alt=""
              />
              <h1>{exchangeCurrency.symbol}</h1>
            </Button>
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
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        disabled={index === 0}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Paper>
              </Fade>
            </Modal>
          </div>

          {/* <div className="flex flex-col space-y-2 p-5">
            <button>
              <Image
                src={toSwapCurrency.logoURI}
                height={24}
                width={24}
                quality={50}
                alt=""
              />
              <h1>{toSwapCurrency.symbol}</h1>
            </button>
          </div> */}
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
