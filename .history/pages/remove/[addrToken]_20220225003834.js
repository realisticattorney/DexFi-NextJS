import { ethers } from 'ethers';
import { useState, useEffect, useRef, useCallback } from 'react'; //hooks
import { useWeb3 } from '../../components/providers/web3';
import fs from 'fs/promises';
import path from 'path';

const Remove = ({ address, formattedCurrency,token }) => {
  const {
    provider,
    registry,
    exchange2,
    web3,
    isUserWalletConnected,
    connect,
  } = useWeb3();

  console.log('address', address);
  console.log('formattedCurrency', formattedCurrency);
  console.log('token', token);
  useEffect(() => {}, [address, formattedCurrency]);

  return (
    <div>
      <h1>Remove</h1>
    </div>
  );
};

export default Remove;

export async function getServerSideProps(context) {
  const { addrToken } = context.query;
  const [address, token] = addrToken.split('_');

  const filePath = path.join(
    process.cwd(),
    'data',
    'ethereum',
    'tokenlist.json'
  );
  const jsonCurrenciesData = await fs.readFile(filePath);
  const allCurrenciesData = JSON.parse(jsonCurrenciesData);

  const selectedCurrency = allCurrenciesData.tokens.filter(
    ({ symbol }) => symbol === token
  );

  const formattedCurrency = selectedCurrency.map(
    ({ symbol, logoURI, decimals, address }) => ({
      symbol,
      logoURI,
      decimals,
      address,
    })
  );

  return {
    props: {
      address,
      token,
      formattedCurrency,
    },
  };
}
