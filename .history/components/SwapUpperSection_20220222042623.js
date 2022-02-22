import SettingsIcon from '@mui/icons-material/Settings';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import ReplayIcon from '@mui/icons-material/Replay';

const SwapUpperSection = () => {
  return (
   <div className="flex-col border-b pb-5">
   <div className="text-center   flex">
     <h1 className="text-xl font-bold tracking-wide ml-[136px] text-dexfi-violet">
       Swap
     </h1>
     <div className="w-full flex items-center justify-center space-x-2">
      
       <button
         className=""
         // onClick={(event) =>
         //   handleMenuItemClick(event, 1, outputToken[1])
         // }
       >
         <SettingsBackupRestoreIcon
           sx={{
             color: '#7c6484',
             fontSize: 25,
           }}
         />
       </button>
       <button
         className=""
         // onClick={(event) =>
         //   handleMenuItemClick(event, 1, outputToken[1])
         // }
       >
         <ReplayIcon
           sx={{
             color: '#7c6484',
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
  )
}

export default SwapUpperSection