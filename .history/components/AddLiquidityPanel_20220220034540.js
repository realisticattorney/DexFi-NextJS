import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuItemList from '../components/MenuItemList';
import Link from 'next/link';

const AddLiquidityPanel = ({ currencies }) => {

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
          <button
            className="text-gray-600"
            //  onClick={(event) =>
            // handleMenuItemClick(event, 1, outputToken.currentToken[1])
            //  }
          >
            <SettingsIcon
              sx={{
                color: '#7c6484',
                fontSize: 25,
              }}
            />
          </button>
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
      {/*  */}
      {/*  */}

      <div className="h-[100px] p-6 mx-auto text-center  ">
        <Link href="/add">
          <a>
            <button className="w-full bg-pink-500 shadow-sm text-white font-bold py-3 px-12 rounded-2xl">
              Connect Wallet
            </button>
          </a>
        </Link>
      </div>
  );
};

export default AddLiquidityPanel;