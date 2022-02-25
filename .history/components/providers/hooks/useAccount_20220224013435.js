import { useEffect, useState } from 'react';
import Web3 from 'web3';
import useSWR from 'swr';

export const handler = (web3) => () => {
  //   const [account, setAccount] = useState(null);

  const {mutate, ...rest} = useSWR(() => {
    web3 ? 'web3/accounts' : null,
      async () => {
        const accounts = await web3.eth.getAccounts();
        return accounts[0];
      };
  });

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
    window.ethereum &&
      window.ethereum.on('accountsChanged', (accounts) =>
        mutate(accounts[0] ?? null)
      );
  }, []);

  return { account };
};
