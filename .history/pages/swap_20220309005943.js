import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import MenuPanel from '../components/MenuPanel.js';
import { scammcoinAddress, USDCAddress, ETCAddress } from '../config-local.js';
import Subnav from '../components/Subnav.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Swap(props) {
  const { currencies } = props;

  return (
    <div className="flex-col ">
      <Subnav marked={'Exchange'} />
      <div className="p-6 mx-auto w-min  mb-[58px] sm:-mb-[102px]">
        <MenuPanel currencies={currencies} section={'swap'} />
        <div className=" absolute -bottom-40 bottom-0 right-10 -mb-1 ">
          <Image src="/help.png" width={191} height={130} alt="lol" />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(
    process.cwd(),
    'data',
    'ethereum',
    'tokenlist.json'
  );
  const jsonCurrenciesData = await fs.readFile(filePath);
  const allCurrenciesData = JSON.parse(jsonCurrenciesData);
  //map over all currencies and get their symbol, logoUri, and decimals
  //filter out the ones that symbol is BNB
  const scammCurrency = {
    symbol: 'SCAM',
    logoURI: '/logo.png',
    decimals: 18,
    address: scammcoinAddress,
  };

  const USDCCurrency = {
    symbol: 'USDC',
    logoURI: '/USDClogo.png',
    decimals: 18,
    address: USDCAddress,
  };

  const ETCCurrency = {
    symbol: 'ETC',
    logoURI: '/ETClogo.png',
    decimals: 18,
    address: ETCAddress,
  };
  const selectedCurrencies = allCurrenciesData.tokens.filter(
    ({ symbol }) => symbol === 'WETH'
  );
  const currencies = selectedCurrencies.map(
    ({ symbol, logoURI, decimals, address }) => ({
      symbol,
      logoURI,
      decimals,
      address,
    })
  );
  currencies.unshift(scammCurrency);
  currencies.push(USDCCurrency);
  currencies.push(ETCCurrency);

  return {
    props: {
      currencies,
    },
  };
}
