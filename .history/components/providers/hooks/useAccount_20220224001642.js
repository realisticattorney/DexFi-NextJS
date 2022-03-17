import { useHooks } from '../web3';
export const useAccount = () => {
  return useHooks((hooks) => hooks.useAccount());
};
