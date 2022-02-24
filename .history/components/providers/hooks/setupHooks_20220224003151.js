import { useEffect, useState } from 'react';


import { handler as createUseAccount } from "./useAccount";
export const createUseAccount = (web3) => () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    };

    web3 && getAccount();
  }, [web3]);

  return { account };
};

export const setupHooks = web3 => {
  return {
    useAccount: createUseAccount(web3)
  }
}