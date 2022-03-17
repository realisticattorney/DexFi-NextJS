import { useEffect, useState } from 'react';

export const handler = (web3) => () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const getAccount = async () => {
       
      window.ethereum.enable().catch((error) => {
         // User denied account access
         console.log(error);
       });
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    };

    web3 && getAccount();
  }, [web3]);

  return { account };
};
