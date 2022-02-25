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

  const handleBlur = () => {
    if (userLpsToRemove < 0) {
      setValue(0);
    } else if (userLpsToRemove > 100) {
      setValue(100);
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

  const returnsEstimator = useCallback(
    async (lps, exchangeBalance, totalSupply, getReserve) => {
      const ethWithdrawn = (exchangeBalance * lps) / totalSupply;
      const tokenWithdrawn = (getReserve * lps) / totalSupply;

      return [ethWithdrawn, tokenWithdrawn];
    },
    []
  );

  return (
    <div className="flex flex-col p-6">
      <div className="flex justify-between">
        <h2 className="text-dexfi-grayviolet text-sm font-medium">Amount</h2>
        <h2 className="font-bold text-sm text-dexfi-cyan">Detailed</h2>
      </div>
      <div className="border my-5 p-4 rounded-2xl ">
        <Box sx={{ width: 'full' }}>
          <h1 className="text-3xl font-extrabold text-dexfi-violet">
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
                  height: '10px',
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
          {/* <button className="shadow-sm text-dexfi-grayviolet py-0.5 px-4 bg-gray-200 border-dexfi-grayviolet border rounded-3xl font-medium hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90`}>
            0.50
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default RemovePanel;
