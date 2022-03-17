import Exchange from '../artifacts/contracts/Exchange.sol/Exchange.json';
import { ethers } from 'ethers';
import { useState, useEffect, useRef, useCallback } from 'react'; //hooks
import { useWeb3 } from '../components/providers/web3';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { styled } from '@mui/material/styles';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Image from 'next/image';

const Input = styled(MuiInput)`
  width: 42px;
`;

const RemovePanel = ({ address, currency }) => {
  const { provider, registry, web3, isUserWalletConnected, connect } =
    useWeb3();

  const [userLps, setUserLps] = useState(0);
  const [userLpsToRemove, setUserLpsToRemove] = useState(0);
  const [exchange, setExchange] = useState(null);
  const [exchangeBalance, setExchangeBalance] = useState(0);
  const [tokenReserve, setTokenReserve] = useState(0);
  const [tokenSupply, setTokenSupply] = useState(0);

  const handleSliderChange = (event, newValue) => {
    setUserLpsToRemove(newValue);
  };

  const handleInputChange = (event) => {
    if (event.target?.value) {
      setUserLpsToRemove(
        event.target.value === '' ? 0 : Number(event.target.value)
      );
    } else {
      setUserLpsToRemove(event);
    }
  };

  console.log('RemovePanel', address, currency);
  console.log('userLps', userLps);
  console.log('userLpsToRemove', userLpsToRemove);
  console.log('exchange', exchange);
  console.log('exchangeBalance', exchangeBalance);
  console.log('tokenReserve', tokenReserve);
  console.log('tokenSupply', tokenSupply);

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
      console.log('KEKEKEKEKEKEKEKEKEK');
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

  const returnsEstimator = useCallback(() => {
    let lps = (userLps * userLpsToRemove) / 100;
    const ethWithdrawn = (exchangeBalance * lps) / tokenSupply;
    const tokenWithdrawn = (tokenReserve * lps) / tokenSupply;

    return [ethWithdrawn, tokenWithdrawn];
  }, [userLps, userLpsToRemove, exchangeBalance, tokenSupply, tokenReserve]);

  return (
    <div className="flex flex-col p-6">
      <div className="flex justify-between">
        <h2 className="text-dexfi-grayviolet text-sm font-medium">Amount</h2>
        <h2 className="font-bold text-sm text-dexfi-cyan">Detailed</h2>
      </div>
      <div className="border my-5 p-4 rounded-2xl ">
        <Box sx={{ width: 'full' }}>
          <h1 className="text-3xl font-extrabold text-dexfi-violet mb-4">
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
        <div className="flex justify-between my-4 mx-5">
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
          }}
        />
      </div>
      <h1 className="text-xs text-dexfi-grayviolet font-bold mt-4">
        YOU WILL RECEIVE
      </h1>
      <div className="my-4 bg-gray-100 w-full p-4 border border-slate-200 rounded-2xl">
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
            {currency.userLPTokens}
          </p>
        </div>
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
            {currency.userLPTokens}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RemovePanel;
