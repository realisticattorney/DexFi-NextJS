import { useHooks } from '../../providers

export const useAccount = () => {
  return useHooks((hooks) => hooks.useAccount)();
};
