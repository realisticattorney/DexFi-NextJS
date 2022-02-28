import Router from 'next/router';
import { useExchange } from '../../providers/web3';

export const useSetExchange = async (exchange) => {
   await useExchange(exchange);
   Router.push('/');
}