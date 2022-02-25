import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

const RemoveLiquidityPanel = ({ currency }) => {
  return (
    <div className="h-[80px] py-3 px-4 flex border-b">
      <div className="flex items-center">
        <Link href="/liquidity">
          <a>
            <ArrowBackIcon
              sx={{
                color: '#7c6484',
                fontSize: 28,
                fontWeight: 'bold',
              }}
            />
          </a>
        </Link>
      </div>
      <div className="flex-col ml-4">
        <h1 className="text-lg font-bold mb-1 text-dexfi-violet">
          Remove {currency.symbol}-WETH liquidity
        </h1>
        <p className="text-sm font-medium text-dexfi-grayviolet">To receive {currency.symbol} and WETH</p>
      </div>

    </div>
  );
};

export default RemoveLiquidityPanel;
