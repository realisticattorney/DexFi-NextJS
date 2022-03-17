import { useState } from "react";

export const createUseAccount = (web3) => () => {
  const [account, setAccount] = useState(null);
  useEffect(() => {
    const getAccount = async () => {
      
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
