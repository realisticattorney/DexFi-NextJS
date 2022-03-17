import { useHooks } from '../../

export const useAccount = () => {
  return useHooks((hooks) => hooks.useAccount)();
};
