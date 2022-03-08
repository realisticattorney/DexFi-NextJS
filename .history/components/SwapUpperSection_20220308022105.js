import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import ReplayIcon from '@mui/icons-material/Replay';
import Settings from './Settings';

const SwapUpperSection = () => {
  return (
    <div className="flex-col border-b pb-5">
      <div className="text-center flex">
        <h1 className="text-xl font-bold tracking-wide ml-[136px] text-dexfi-violet">
          Swap
        </h1>
        <div className="w-full flex items-center justify-center space-x-2">
          <Settings />
          <button className="">
            <SettingsBackupRestoreIcon
              sx={{
                color: '#7A6EAA',
                fontSize: 25,
              }}
            />
          </button>
          <button className="">
            <ReplayIcon
              sx={{
                color: '#7A6EAA',
                fontSize: 25,
              }}
            />
          </button>
        </div>
      </div>
      <div className="block">
        <p className="text-sm font-medium text-center mt-1 text-dexfi-grayviolet">
          Trade tokens in an instant
        </p>
      </div>
    </div>
  );
};

export default SwapUpperSection;
