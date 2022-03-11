import { handler as createNetworkHook } from "./useNetwork";

export const setupHooks = (...deps) => {
  return {
    useNetwork: createNetworkHook(...deps)
  }
}