import { useAccount } from './useAccount';

export const setupHooks = (web3) => {
  if (!web3) {
    return DEFAULT_HOOKS;
  }

  return {
    useAccount: useAccount(web3),
  };
};
