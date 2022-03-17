const {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} = require('react');
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { setupHooks } from './hooks/setupHooks.js';
import Web3 from 'web3';
import Moralis from 'moralis';
import { registryAddress, scammExchangeAddress } from '../../config-local.js';
import Registry from '../../utils/Registry.json';
import Exchange from '../../utils/Exchange.json';

const Web3Context = createContext(null);
const API_KEY = process.env.API_KEY;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;


export default function Web3Provider({ children }) {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    exchangeBunny: null,
    registry: null,
    isLoading: true,
    providerType: null,
    exchangeCurrent: null,
  });

  useEffect(() => {
    const loadProvider = async () => {
      // const provider = new ethers.providers.getDefaultProvider(
      //   'http://localhost:8545'
      // );
      
      const url = `https://eth-rinkeby.alchemyapi.io/v2/nyTlwya67CtkePdd15Xx8GeeMmHBHC4J`;
      const provider = new ethers.providers.JsonRpcProvider(url);
      // const providerMetamask = await detectEthereumProvider();
      if (provider) {
        // Moralis.start();
        // const web3 = new Web3(providerMetamask);
        const registry = new ethers.Contract(
          registryAddress,
          Registry.abi,
          provider
        );
        
        const exchangeBunny = new ethers.Contract(
          scammExchangeAddress,
          Exchange.abi,
          provider
        );
        const exchangeBalance = ethers.utils.formatEther(
          await provider.getBalance(exchangeBunny.address)
        );
        const getReserve = ethers.utils.formatEther(
          await exchangeBunny.getReserve()
        );
        const totalSupply = ethers.utils.formatEther(
          await exchangeBunny.totalSupply()
        );
        setWeb3Api({
          provider,
          registry,
          exchangeBunny: {
            balance: exchangeBalance,
            reserve: getReserve,
            totalSupply,
            contract: exchangeBunny,
          },
          isLoading: false,
          providerType: 'default',
          exchangeCurrent: {
            balance: exchangeBalance,
            reserve: getReserve,
            totalSupply,
            contract: exchangeBunny,
          },
        });
      } else {
        setWeb3Api((api) => ({ ...api, isLoading: false }));
        console.error('Please, install Metamask.');
      }
    };

    loadProvider();
  }, []);
  const _web3Api = useMemo(() => {
    return {
      ...web3Api,
      isWeb3Loaded: web3Api.providerType === 'default',
      isUserWalletConnected: web3Api.providerType === 'user',
      // getHooks: () => setupHooks(web3Api.web3, web3Api.providerMetamask),
      setExchangeCurrent: async (exchange) => {
        const exchangeBalance = ethers.utils.formatEther(
          await web3Api.provider.getBalance(exchange.address)
        );
        const getReserve = ethers.utils.formatEther(
          await exchange.getReserve()
        );
        const totalSupply = ethers.utils.formatEther(
          await exchange.totalSupply()
        );
        setWeb3Api((api) => ({
          ...api,
          exchangeCurrent: {
            balance: exchangeBalance,
            reserve: getReserve,
            totalSupply,
            contract: exchange,
          },
        }));
      },
    };
  }, [web3Api]);

  return (
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}

export async function useExchange(exchange) {
  const { setExchangeCurrent } = useWeb3();
  await setExchangeCurrent(exchange);
}
