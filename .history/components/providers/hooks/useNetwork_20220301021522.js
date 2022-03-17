import useSWR from "swr";

export const handler = (web3) => () => {

  useSWR() => {
    web3 ? "web3/network"
    
  
  return {
    network: {
      data: 'Testing Network',
    },
  };
};
