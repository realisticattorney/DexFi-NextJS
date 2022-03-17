import useSWR from "swr";

export const handler = (web3) => () => {

  const swrResponse = useSWR(() => {
    web3 ? "web3/network" : null,
    async () => {
      const netId = web3.eth.net.getId()
        return netId
    }
  })
  
  
  return {
    network: {
      data: 'Testing Network',
    },
  };
};
