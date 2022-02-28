import Exchange from '../artifacts/contracts/Exchange.sol/Exchange.json';
import { ethers } from 'ethers';
import { useState, useEffect, useCallback } from 'react';
import { useWeb3 } from '../components/providers/web3';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Image from 'next/image';
import Web3Modal from 'web3modal';
import ERC20Token from '../artifacts/contracts/ERC20Token.sol/ERC20Token.json';
import Router from 'next/router';
import {useSetExchange} from '../web3/hooks/exchange';
const RemovePanel = ({ address, currency, backCurrency }) => {
  const { provider, registry, connect, isUserWalletConnected } = useWeb3();

  const [userLps, setUserLps] = useState(0);
  const [userLpsToRemove, setUserLpsToRemove] = useState(0);
  const [exchange, setExchange] = useState(null);
  const [exchangeBalance, setExchangeBalance] = useState(0);
  const [tokenReserve, setTokenReserve] = useState(0);
  const [tokenSupply, setTokenSupply] = useState(0);
  const [expectedWithdrawn, setExpectedWithdrawn] = useState([0, 0]);

  const handleSliderChange = (event, newValue) => {
    setUserLpsToRemove(newValue);
    returnsEstimator(newValue);
  };

  const handleInputChange = (event) => {
    if (event.target?.value) {
      setUserLpsToRemove(
        event.target.value === '' ? 0 : Number(event.target.value)
      );
      returnsEstimator(event.target.value);
    } else {
      setUserLpsToRemove(event);
      returnsEstimator(event);
    }
  };

  useEffect(() => {
    if (tokenSupply > 0) {
      return;
    }
    const loadExchange = async () => {
      let mappedExchangeAddress = await registry.getExchange(currency.address);
      const exchange = new ethers.Contract(
        mappedExchangeAddress,
        Exchange.abi,
        provider
      );
      const userLPTokens = ethers.utils.formatEther(
        await exchange.balanceOf(address)
      );

      const exchangeBalance = ethers.utils.formatEther(
        await provider.getBalance(exchange.address)
      );
      const getReserve = ethers.utils.formatEther(await exchange.getReserve());
      const totalSupply = ethers.utils.formatEther(
        await exchange.totalSupply()
      );

      setExchange(exchange);
      setUserLps(userLPTokens);
      setExchangeBalance(exchangeBalance);
      setTokenReserve(getReserve);
      setTokenSupply(totalSupply);
    };

    loadExchange();
  }, [address, currency.address, provider, registry, tokenSupply]);

  const returnsEstimator = useCallback(
    (userLpsToRemove) => {
      let lps = (userLps * userLpsToRemove) / 100;
      const ethWithdrawn = (exchangeBalance * lps) / tokenSupply;
      const tokenWithdrawn = (tokenReserve * lps) / tokenSupply;

      setExpectedWithdrawn([ethWithdrawn, tokenWithdrawn]);
    },
    [userLps, exchangeBalance, tokenSupply, tokenReserve]
  );

  async function remove() {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const tokenUserConnection = new ethers.Contract(
      currency.address,
      ERC20Token.abi,
      signer
    );
    const exchangeUserConnection = new ethers.Contract(
      exchange.address,
      Exchange.abi,
      signer
    );

    const wasApproved = await tokenUserConnection.approve(
      exchange.address,
      ethers.utils.parseEther(userLpsToRemove.toString())
    );
    console.log('not yet confirmed');
    let waitDude = await wasApproved.wait();
    console.log('waitdudeee', waitDude);
    console.log('was approved?', wasApproved);
    const allowanceAmount = ethers.utils.formatEther(
      await tokenUserConnection.allowance(
        await signer.getAddress(),
        exchange.address
      )
    );

    console.log('allowanceAmount', allowanceAmount);

    if (allowanceAmount === '0') {
      console.log('no allowance');
      return;
    }

    if (allowanceAmount < userLpsToRemove.toString()) {
      console.log('not enough allowance');
      return;
    }

    let transaction = await exchangeUserConnection.removeLiquidity(
      ethers.utils.parseEther(userLpsToRemove.toString())
    );
    console.log('transaction', transaction);
    if (transaction.hash) {
      Router.push('/');
    }
  }

  return (
    <div className="flex flex-col p-5">
      <div className="flex justify-between mx-2">
        <h2 className="text-dexfi-grayviolet text-sm font-medium">Amount</h2>
        <h2 className="font-bold text-sm text-dexfi-cyan">Detailed</h2>
      </div>
      <div className="border my-4 px-4 py-3 rounded-2xl ">
        <Box sx={{ width: 'full', marginLeft: '3px', marginRight: '5px' }}>
          <h1 className="text-4xl font-bold text-dexfi-violet mb-2.5">
            {userLpsToRemove}%
          </h1>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                value={
                  typeof userLpsToRemove === 'number' ? userLpsToRemove : 0
                }
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
                sx={{
                  color: '#1FC7D4',
                  height: '9px',
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <div className="flex justify-between mt-2.5 mx-2 mb-1.5">
          <button
            className={`shadow-sm py-0.5 px-4    rounded-3xl font-bold hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90 ${
              userLpsToRemove === 25
                ? ' text-white bg-dexfi-cyan'
                : 'text-dexfi-cyan bg-gray-100'
            }`}
            onClick={() => {
              handleInputChange(25);
            }}
          >
            25%
          </button>
          <button
            className={`shadow-sm py-0.5 px-4    rounded-3xl font-bold hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90 ${
              userLpsToRemove === 50
                ? ' text-white bg-dexfi-cyan'
                : 'text-dexfi-cyan bg-gray-100'
            }`}
            onClick={() => {
              handleInputChange(50);
            }}
          >
            50%
          </button>
          <button
            className={`shadow-sm py-0.5 px-4    rounded-3xl font-bold hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90 ${
              userLpsToRemove === 75
                ? ' text-white bg-dexfi-cyan'
                : 'text-dexfi-cyan bg-gray-100'
            }`}
            onClick={() => {
              handleInputChange(75);
            }}
          >
            75%
          </button>
          <button
            className={`shadow-sm py-0.5 px-4    rounded-3xl font-bold hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90 ${
              userLpsToRemove === 100
                ? ' text-white bg-dexfi-cyan'
                : 'text-dexfi-cyan bg-gray-100'
            }`}
            onClick={() => {
              handleInputChange(100);
            }}
          >
            Max
          </button>
        </div>
      </div>
      <div className="flex text-center justify-center -mt-2">
        <ArrowDownwardIcon
          sx={{
            color: '#7A6EAA',
            fontSize: '22px',
          }}
        />
      </div>
      <h1 className="text-xs text-dexfi-grayviolet font-bold mt-2">
        YOU WILL RECEIVE
      </h1>
      <div className="my-2 bg-gray-100 w-full p-4 border border-slate-200 rounded-2xl">
        <div className="flex justify-between">
          <div className="flex">
            <Image
              src={currency.logoURI}
              height={20}
              width={20}
              quality={50}
              alt=""
            />
            <h1 className="ml-2 font-medium text-sm text-dexfi-grayviolet">
              {currency.symbol}
            </h1>
          </div>
          <p className="font-medium text-sm text-dexfi-grayviolet">
            {expectedWithdrawn[0]}
          </p>
        </div>
        <div className="flex justify-between mt-2.5">
          <div className="flex">
            <Image
              src={backCurrency.logoURI}
              height={20}
              width={20}
              quality={50}
              alt=""
            />
            <h1 className="ml-2 font-medium text-sm text-dexfi-grayviolet">
              {backCurrency.symbol}
            </h1>
          </div>
          <p className="font-medium text-sm text-dexfi-grayviolet">
            {expectedWithdrawn[1]}
          </p>
        </div>
      </div>
      <h1 className="text-xs text-dexfi-grayviolet font-bold mt-2">PRICES</h1>
      <div className="mt-2 bg-gray-100 w-full p-4 border border-slate-200 rounded-2xl">
        <div className="flex justify-between">
          <h1 className="font-medium text-sm text-dexfi-grayviolet">
            1 {currency.symbol}
          </h1>
          <p className="font-medium text-sm text-dexfi-grayviolet">
            {exchangeBalance / tokenReserve} {backCurrency.symbol}
          </p>
        </div>
        <div className="flex justify-between mt-1">
          <h1 className="font-medium text-sm text-dexfi-grayviolet">1 WETH</h1>
          <p className="font-medium text-sm text-dexfi-grayviolet">
            {tokenReserve / exchangeBalance} {currency.symbol}
          </p>
        </div>
      </div>
      <button
        className="w-full hover:opacity-75 mt-3 transition-opacity duration-150  bg-dexfi-cyan shadow-sm text-white font-bold py-2 px-12 rounded-xl active:translate-y-0.1 active:shadow-none active:opacity-90"
        onClick={() => {
          isUserWalletConnected ? remove() : connect();
        }}
      >
        Remove Liquidity
      </button>
    </div>
  );
};

export default RemovePanel;
