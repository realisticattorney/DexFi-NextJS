import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

const RemoveLiquidityPanel = ({ currency }) => {
  return (
    <div className="h-[100px] p-6 flex border-b">
      <div className="flex items-center">
        <Link href="/liquidity">
          <a>
            <ArrowBackIcon
              sx={{
                color: '#7c6484',
                fontSize: 33,
                fontWeight: 'bold',
              }}
            />
          </a>
        </Link>
      </div>
      <div className="flex-col ml-4">
        <h1 className="text-xl font-bold mb-1 text-dexfi-violet">
          Remove {currency.symbol}-WETH liquidity
        </h1>
        <p className="text-sm ">To receive {currency.symbol} and WETH</p>
      </div>

    </div>
  );
};

export default RemoveLiquidityPanel;
