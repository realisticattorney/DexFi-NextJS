import Exchange from '../artifacts/contracts/Exchange.sol/Exchange.json';
import ERC20Token from '../artifacts/contracts/ERC20Token.sol/ERC20Token.json';
import { ethers } from 'ethers';
import { useState, useEffect, useRef, useCallback } from 'react'; //hooks
import { useWeb3 } from '../../components/providers/web3';

const RemovePanel = ({address,currency}) => {
  const {
    provider,
    registry,
    exchange2,
    web3,
    isUserWalletConnected,
    connect,
  } = useWeb3();

  useEffect(() => {
      const load
 let mappedExchangeAddress = await registry.getExchange(
          currency.address
        );

  }, [isUserWalletConnected]);
  

  return <div>RemovePanel</div>;
};

export default RemovePanel;
