import { useEffect, useState } from 'react';
import Web3 from 'web3';
import useSWR from 'swr';

export const handler = (web3) => () => {
  //   const [account, setAccount] = useState(null);

  const swrResponse = useSWR(() => {
    'web3/accounts',
     async () => {
        return 'Hello World';
      };
  });

  
  useEffect(() => {
    const getAccount = async () => {
      const providerAccounts = new Web3(window.ethereum);
      if (!window.ethereum) {
        return;
      }
      window.ethereum?.enable().catch((error) => {
        // User denied account access
        console.log(error);
      });
      const [account] = await providerAccounts.eth.getAccounts();

      setAccount(account);
    };

    getAccount();
  }, []);

  useEffect(() => {
    window.ethereum &&
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] ?? null);
      });
  }, []);

  return { account };
};
