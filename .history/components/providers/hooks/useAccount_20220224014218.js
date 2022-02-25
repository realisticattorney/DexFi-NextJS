import { useEffect, useState } from 'react';
import Web3 from 'web3';
import useSWR from 'swr';

export const handler = (web3) => () => {
  //   const [account, setAccount] = useState(null);

  const { mutate, ...rest } = useSWR(() => {
   return web3 ? 'web3/accounts' : null} ,
      async () => {
        window.ethereum?.enable();
        const accounts = await web3.eth.getAccounts();
        return accounts[0];
      }

  //   useEffect(() => {
  //     const getAccount = async () => {
  //       const providerAccounts = new Web3(window.ethereum);
  //       if (!window.ethereum) {
  //         return;
  //       }
  //       window.ethereum?.enable().catch((error) => {
  //         // User denied account access
  //         console.log(error);
  //       });
  //       const [account] = await providerAccounts.eth.getAccounts();

  //       setAccount(account);
  //     };

  //     getAccount();
  //   }, [web3]);

  useEffect(() => {
    window.ethereum ? (() =>{
      window.ethereum?.enable();
      window.ethereum.on('accountsChanged', (accounts) => {
        return mutate(accounts[0] ?? null);
      });
      })() : null;
  }, [mutate]);

  return { account: { mutate, rest } };
};
