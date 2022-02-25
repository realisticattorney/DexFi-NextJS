import Exchange from '../artifacts/contracts/Exchange.sol/Exchange.json';
import { ethers } from 'ethers';
import { useState, useEffect, useRef, useCallback } from 'react'; //hooks
import { useWeb3 } from '../components/providers/web3';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const RemovePanel = ({ address, currency }) => {
  const {
    provider,
    registry,
    web3,
    isUserWalletConnected,
    connect,
  } = useWeb3();

  const [userLps, setUserLps] = useState(0);
  const [userLpsToRemove, setUserLpsToRemove] = useState(0);
  const [exchange, setExchange] = useState(null);
  const [exchangeBalance, setExchangeBalance] = useState(0);
  const [tokenReserve, setTokenReserve] = useState(0);
  const [tokenSupply, setTokenSupply] = useState(0);

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
        <h2>Amount</h2>
        <h2>Detailed</h2>
      </div>
      <div>
      <Box width={300}>
      <Slider
        size="small"
        defaultValue={70}
        aria-label="Small"
        valueLabelDisplay="auto"
      />
      <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
    </Box>
      </div>
    </div>
  );
};

export default RemovePanel;
