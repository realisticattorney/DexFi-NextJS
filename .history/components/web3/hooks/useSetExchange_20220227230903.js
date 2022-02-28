import { redirect } from 'next/dist/server/api-utils';
import { useExchange } from '../../providers/web3';

export const useSetExchange = async (exchange) => {
   await useExchange(exchange);
   redirect
}