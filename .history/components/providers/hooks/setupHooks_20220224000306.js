import { useAccount } from './useAccount';

const DEFAULT_HOOKS = {
  useAccount: () => {},
};


export const setupHooks = (hooks = DEFAULT_HOOKS) => {