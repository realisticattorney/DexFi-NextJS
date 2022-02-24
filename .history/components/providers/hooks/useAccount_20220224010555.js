import { useEffect, useState } from 'react';
import Web3 from 'web3';
export const handler = (web3) => () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const getAccount = async () => {
      const providerAccounts = new Web3(window.ethereum);
      if(windows.ethereum.selectedAddress) {
      window.ethereum.enable().catch((error) => {
        // User denied account access
        console.log(error);
      });
      const [account] = await providerAccounts.eth.getAccounts();

      setAccount(account);
    };

    web3 && getAccount();
  }, [web3]);

  return { account };
};
