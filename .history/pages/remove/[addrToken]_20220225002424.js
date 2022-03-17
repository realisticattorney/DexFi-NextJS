import { ethers } from 'ethers';
import { useState, useEffect, useRef, useCallback } from 'react'; //hooks
import { useWeb3 } from '../../components/providers/web3';

const Remove = ({address, token}) => {
  const {
    provider,
    registry,
    exchange2,
    web3,
    isUserWalletConnected,
    connect,
  } = useWeb3();
  
   console.log('address', address);
   console.log('token', token);
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

   return {
       props: {
             address,
             token
         }
   }
}
