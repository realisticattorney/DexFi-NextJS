export const useAccount = (web3) => () => {
  return {
    accounts: web3 ? 'test account' : 'null',
  };
};
