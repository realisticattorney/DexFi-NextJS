import React from 'react';

const MenuPanelFooter = ({
  inputOne,
  inputTwo,
  inputToken,
  outputToken,
  section,
}) => {
   if(section === 'exchange') {
  return (
   section === 'Exchange' ? (
    <div className="flex-col mt-5 relative py-4 w-[328px] h-[95px] bg-white rounded-3xl border border-gray-50">
      <div className="flex justify-between px-4">
        <h2 className="text-dexfi-grayviolet opacity-95 font-medium text-sm">
          Minimun received
        </h2>
        <h2 className="text-dexfi-violet font-medium text-sm tracking-wide">
          {(inputTwo * 99).toFixed(3)} {outputToken[0].symbol}
        </h2>
      </div>
      <div className="flex justify-between px-4">
        <h2 className="text-dexfi-grayviolet opacity-95 font-medium text-sm">
          Price Impact
        </h2>
        {inputTwo > 0 ? (
          <h2 className="text-emerald-400 font-medium text-sm tracking-wide">
            {'<'}
            {((parseInt(inputTwo) / parseInt(balance)) * 100 + 0.01).toFixed(2)}
            %
          </h2>
        ) : (
          <h2 className="text-emerald-400 font-medium text-sm tracking-wide">
            {'<'}0.01%
          </h2>
        )}
      </div>
      <div className="flex justify-between px-4">
        <h2 className="text-dexfi-grayviolet opacity-95 font-medium text-sm">
          Liquidity Provider Fee
        </h2>
        <h2 className="text-dexfi-violet font-medium text-sm tracking-wide">
          {(inputOne / 100).toFixed(3)} {inputToken[0].symbol}
        </h2>
      </div>
    </div>
    
  );
};

export default MenuPanelFooter;
