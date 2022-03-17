import { useHooks } from '../../components/providers/web3.js';

export const useAccount = () => {
  return useHooks((hooks) => hooks.useAccount)();
};
