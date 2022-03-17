export const useAccount = (web3) => () => {
  return {
    account: web3 ? 'test account' : 'null',
  };
};

export const setupHooks = (web3) => {
  return {
    useAccount: useAccount(web3),
  };
};
