import { useEffect, useState } from 'react';
import { handler as createUseAccount } from './useAccount';
import { handler as createUseNetwork } from './useAccount';

export const setupHooks = (web3) => {
  return {
    useAccount: createUseAccount(web3),
  };
};
