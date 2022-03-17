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


  useEffect(() => {
    const loadExchange = async () => {
      let mappedExchangeAddress = await registry.getExchange(currency.address);
      let connectToAbi = new ethers.Contract(
        mappedExchangeAddress,
        Exchange.abi,
        provider
      );

      const userLPTokens = ethers.utils.formatEther(
        await connectToAbi.balanceOf(account)
      );

      setBalance(userLPTokens);

    };


    loadExchange();
  }, [isUserWalletConnected]);

  return <div>RemovePanel</div>;
};

export default RemovePanel;
