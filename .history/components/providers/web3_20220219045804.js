const { createContext, useContext, useEffect, useState, useMemo } = require("react");
import { ethers } from 'ethers';
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

const Web3Context = createContext(null)

export default function Web3Provider({children}) {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
    registry: null,
    isLoading: true,
    providerType: null
  })

  useEffect(() => {
    const loadProvider = async () => {

      const provider = new ethers.providers.getDefaultProvider("http://localhost:8545")
      if (provider) {
        const registry = new ethers.Contract(
          registryAddress,
          Registry.abi,
          provider
        );

        setWeb3Api({
          provider,
          web3,
          registry,
          contract: null,
          isLoading: false,
          providerType: "default"
        })
      } else {
        setWeb3Api(api => ({...api, isLoading: false}))
        console.error("Please, install Metamask.")
      }
    }

    loadProvider()
  }, [])

  const _web3Api = useMemo(() => {
    return {
      ...web3Api,
      isWeb3Loaded: web3Api.web3 != null,
      connect: web3Api.provider ?
        async () => {
          try {
            await web3Api.provider.request({method: "eth_requestAccounts"})
          } catch {
            location.reload()
          }
        } :
        () => console.error("Cannot connect to Metamask, try to reload your browser please.")
    }
  }, [web3Api])

  return (
    <Web3Context.Provider value={_web3Api}>
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  return useContext(Web3Context)
}