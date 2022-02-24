import { useAccount } from './useAccount';

const DEFAULT_HOOKS = {
  useAccount: () => {},
};

export const setupHooks = (web3) => {
   if(!web3) { re
  return {
    useAccount: useAccount(web3),
  };
};
