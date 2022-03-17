import React from 'react'
import Exchange from '../artifacts/contracts/Exchange.sol/Exchange.json';
import ERC20Token from '../artifacts/contracts/ERC20Token.sol/ERC20Token.json';
import { ethers } from 'ethers';
import { useState, useEffect, useRef, useCallback } from 'react'; //hooks
import { useWeb3 } from '../../components/providers/web3';

const RemovePanel = () => {
   const {
      provider,
      registry,
      exchange2,
      web3,
      isUserWalletConnected,
      connect,
    } = useWeb3();
   
   
  return (
    <div>RemovePanel</div>
  )
}

export default RemovePanel