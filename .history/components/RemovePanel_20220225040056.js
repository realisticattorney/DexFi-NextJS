import Exchange from '../artifacts/contracts/Exchange.sol/Exchange.json';
import ERC20Token from '../artifacts/contracts/ERC20Token.sol/ERC20Token.json';
import { ethers } from 'ethers';
import { useState, useEffect, useRef, useCallback } from 'react'; //hooks
import { useWeb3 } from '../../components/providers/web3';

const RemovePanel = ({ address, currency }) => {
  const {
    provider,
    registry,
    //  exchange2,
    web3,
    isUserWalletConnected,
    connect,
  } = useWeb3();

  const [balance, setBalance] = useState(0);
  const [exchange, setExchange] = useState(null);

  useEffect(() => {
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
      const getReserve = ethers.utils.formatEther(
         
      const totalSupply = ethers.utils.formatEther(
        await exchange.totalSupply()
      );

      returnsEstimator(userLPTokens, exchange, exchangeBalance, totalSupply);

      const getReserve = ethers.utils.formatEther(await exchange.getReserve());

      setExchange(exchange);
      setBalance(userLPTokens);
    };

    loadExchange();
  }, [isUserWalletConnected]);

  const returnsEstimator = useCallback(
    async (lps, exchange, exchangeBalance, totalSupply) => {
       const ethWithdrawn = (exchangeBalance * lps) / totalSupply;
       const tokenWithdrawn = ()
    },
    [exchange, address]
  );

  return <div>RemovePanel</div>;
};

export default RemovePanel;
