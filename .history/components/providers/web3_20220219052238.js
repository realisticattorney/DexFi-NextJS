const {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} = require('react');
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

import {
  registryAddress,
  scammExchangeAddress,
  scammcoinAddress,
  USDCAddress,
  ETCAddress,
} from '../../config.js';

import Registry from '../../artifacts/contracts/Registry.sol/Registry.json';
import Exchange from '../../artifacts/contracts/Exchange.sol/Exchange.json';
import ERC20Token from '../../artifacts/contracts/ERC20Token.sol/ERC20Token.json';

const Web3Context = createContext(null);

export default function Web3Provider({ children }) {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    // web3: null,
    exchange: null,
    registry: null,
    isLoading: true,
    providerType: null,
  });

  useEffect(() => {
    const loadProvider = async () => {
      const provider = new ethers.providers.getDefaultProvider(
        'http://localhost:8545'
      );
      if (provider) {
        // const web3 = new Web3(provider)
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

        setWeb3Api({
          provider,
          // web3,
          registry,
          exchange,
          isLoading: false,
          providerType: 'default',
        });
      } else {
        setWeb3Api((api) => ({ ...api, isLoading: false }));
        console.error('Please, install Metamask.');
      }
    };

    loadProvider();
  }, []);

  const _web3Api = useCallback(() => {
    return {
      ...web3Api,
      isWeb3Loaded: web3Api.providerType === 'default',
      isUserWalletConnected: web3Api.providerType === 'user',
      connect: web3Api.provider
        ? async () => {
            try {
              // await web3Api.provider.request({method: "eth_requestAccounts"})
              const provider = new ethers.providers.Web3Provider(
                window.ethereum
              );
              if (provider) {
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

                setWeb3Api({
                  provider,
                  registry,
                  exchange,
                  isLoading: false,
                  providerType: 'user',
                });
              }
            } catch {
              location.reload();
            }
          }
        : () =>
            console.error(
              'Cannot connect to Metamask, try to reload your browser please.'
            ),
    };
  }, [web3Api]);

  return (
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}
