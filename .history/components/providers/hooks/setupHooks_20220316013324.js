import { useChain as createNetworkHook } from "./useChain";

export const setupHooks = (...deps) => {
  return {
    useNetwork: createNetworkHook(...deps)
  }
}