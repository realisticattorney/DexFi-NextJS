import useSWR from "swr";

export const handler = (web3) => () => {

  useSWR() => {
    web3 ? "web3/network" : null,
    async () => {
      web3.eth.net.getId()
  
  
  return {
    network: {
      data: 'Testing Network',
    },
  };
};
