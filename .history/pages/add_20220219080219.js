import { useWeb3 } from '../components/providers/web3';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Subnav from '../components/Subnav';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Add() {
  const {
    provider,
    registry,
    exchange2,
    web3,
    isUserWalletConnected,
    connect,
  } = useWeb3();
  console.log('provider', provider);
  console.log('web3', web3);

  return (
    <div className="flex-col ">

      <div className="p-6 mx-auto w-min">
        <div className="flex-col relative w-[436px] h-[273px] bg-white rounded-3xl border shadow-sm">
          <div className="h-[100px] p-6 justify-between flex border-b">
          
            <div className="flex-col">
              <h1 className="text-xl font-bold">Add Liquidity</h1>
              <p className="text-sm">Add liquidity to receive LP tokens</p>
            </div>
            <div className="w-[80px] flex items-center justify-between">
              <button
                className="text-gray-600"
                onClick={(event) =>
                  handleMenuItemClick(event, 1, outputToken.currentToken[1])
                }
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
                onClick={(event) =>
                  handleMenuItemClick(event, 1, outputToken.currentToken[1])
                }
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
   
          <div className="h-[100px] p-6 mx-auto text-center  ">
            <Link href="/add">
              <a>
                <button className="w-full bg-pink-500 shadow-sm text-white font-bold py-3 px-12 rounded-2xl">
                  Connect Wallet
                </button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
