

export const useAccount = (web3) => () => {
  return {
    account: web3 ? 'test account' : 'null',
  };
};
