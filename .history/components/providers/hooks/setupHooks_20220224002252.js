import { useState } from 'react';

export const createUseAccount = (web3) => () => {
  const [account, setAccount] = useState(null);
  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    };
    web3 getAccount();
  }, [web3]);
  return {
    account: web3 ? 'test account' : 'null',
  };
};

export const setupHooks = (web3) => {
  return {
    useAccount: createUseAccount(web3),
  };
};
