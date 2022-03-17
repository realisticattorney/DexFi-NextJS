import { useChain as createNetworkHook } from './useChain';

export const setupHooks = () => {
  return {
    useChain: createNetworkHook,
  };
};
