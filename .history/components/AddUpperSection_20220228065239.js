import SettingsIcon from '@mui/icons-material/Settings';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import Settings from './Settings';

const AddLiquidityPanel = () => {
  return (
    <div className="h-[100px] p-6 justify-between flex border-b">
      <div className="flex items-center -mr-9">
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
      <div className="flex-col">
        <h1 className="text-xl font-bold mb-1">Add Liquidity</h1>
        <p className="text-sm">Add liquidity to receive LP tokens</p>
      </div>
      <div className="w-[80px] flex items-center justify-between">
      <Settings />
        <button
          className=""
          //  onClick={(event) =>
          // handleMenuItemClick(event, 1, outputToken.currentToken[1])
          //  }
        >
          <SettingsBackupRestoreIcon
            sx={{
              color: '#7c6484',
              fontSize: 25,
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default AddLiquidityPanel;
