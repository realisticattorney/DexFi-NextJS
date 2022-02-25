import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

const RemoveLiquidityPanel = ({currency}) => {
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
         <h1 className="text-xl font-bold mb-1">Remove {currency.symbol}-WETH liquidity</h1>
         <p className="text-sm">To receive </p>
       </div>
       <div className="w-[80px] flex items-center justify-between">
      
       </div>
     </div>
   );
 };
 
 export default RemoveLiquidityPanel;
 