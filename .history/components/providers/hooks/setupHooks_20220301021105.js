import { useEffect, useState } from 'react';
import { handler as createUseAccount } from './useAccount';
import { handler as createNetworkHook } from './useNetwork';

export const setupHooks = (web3) => {
  return {
    useAccount: createUseAccount(web3),
    useNetwork: createNetworkHook
  };
};
