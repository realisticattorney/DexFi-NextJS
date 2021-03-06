import { useEffect } from "react"
import useSWR from "swr"

const adminAddresses = {
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266": true
}

export const handler = (web3, provider) => () => {

  const { data, mutate, ...rest } = useSWR(() =>
    web3 ? "web3/accounts" : null,
    async () => {
      const accounts = await web3.eth.getAccounts()
      return accounts[0]
    }
  )

  useEffect(() => {
    provider &&
    provider.on("accountsChanged",
      accounts => mutate(accounts[0] ?? null)
    )
  }, [provider])

  return {
    account: {
      data,
      isAdmin: (
        data &&
        adminAddresses[web3.utils.keccak256(data)]) ?? false,
      mutate,
      ...rest
    }
  }
}