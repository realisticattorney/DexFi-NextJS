
import fs from 'fs/promises';
import path from 'path';
import { scammcoinAddress, USDCAddress, ETCAddress } from '../../config.js';
import RemoveUpperSection from '../../components/RemoveUpperSection';
// import RemovePanel from '../../components/RemovePanel';
const Remove = ({ address, currency }) => {


  console.log('address', address);
  console.log('currency', currency);
  

  return (
    <div className="flex-col ">
    <div className="p-6 mx-auto w-min">
      <div className="flex-col relative w-[436px] h-[626px] bg-white rounded-3xl border shadow-sm">
        <RemoveUpperSection currency={currency} />
      </div>
    </div>
  </div>
  );
};

export default Remove;

export async function getServerSideProps(context) {
  const { addrToken } = context.query;
  const [address, token] = addrToken.split('_');

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

  const currencies = [scammCurrency, USDCCurrency, ETCCurrency];

  const currency = currencies.find(({ symbol }) => symbol === token);

  return {
    props: {
      address,
      currency,
    },
  };
}

// const filePath = path.join(
//   process.cwd(),
//   'data',
//   'ethereum',
//   'tokenlist.json'
// );
// const jsonCurrenciesData = await fs.readFile(filePath);
// const allCurrenciesData = JSON.parse(jsonCurrenciesData);

// const selectedCurrency = allCurrenciesData.tokens.filter(
//   ({ symbol }) => symbol === "WETH"
// );

// const formattedCurrency = selectedCurrency.map(
//   ({ symbol, logoURI, decimals, address }) => ({
//     symbol,
//     logoURI,
//     decimals,
//     address,
//   })
// );
