import useSWR from "swr";

export const handler = (web3) => () => {

  useSWR() => {
    web3 ? "web3/network" : null,
    async () => {
      
  
  
  return {
    network: {
      data: 'Testing Network',
    },
  };
};
