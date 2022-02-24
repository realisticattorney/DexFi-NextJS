import Web3Api from 'moralis/types/generated/web3Api';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
export const handler = (web3) => () => {
  const [account, setAccount] = useState(null);

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
      const [account] = await web3Api.web3.eth.getAccounts();

      setAccount(account);
    };

    web3 && getAccount();
  }, [web3]);

  useEffect(() => {
    window.ethereum &&
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] ?? null);
      });
  }, []);

  return { account };
};
