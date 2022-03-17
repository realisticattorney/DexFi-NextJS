import React from 'react';

const PriceEstimator = ({
  inputOne,
  inputTwo,
  inputToken,
  outputToken,
  section,
}) => {
  if (section === 'swap') {
    return (
      <>
        {inputOne > 0 && (
          <div className="h-8">
            <div className="flex w-full justify-around">
              <h1 className="text-xs font-bold text-dexfi-violet">Price</h1>
              <h1 className="truncate text-sm">{`${
                (inputOne / inputTwo).toString().length > 9
                  ? (inputOne / inputTwo).toString().substring(0, 10)
                  : (inputOne / inputTwo).toString()
              } ${inputToken[0].symbol} per ${outputToken[0].symbol}`}</h1>
            </div>
          </div>
        )}
        <div className="h-10">
          <div className="flex w-full justify-around">
            <h1 className="text-xs1 font-bold text-violet-700 mr-20">
              Slippage tolerance
            </h1>
            <h1 className="truncate text-sm font-bold text-pink-500">0.5%</h1>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className='p-6'>
        <div className="h-[136px] w-full shadow  flex-col">
          <h1 className="text-sm  font-semibold text-dexfi-violet">
            Prices and pool share
          </h1>
          <div className="flex justify-around">
            <h1 className="truncate text-sm">{`${
              (inputOne / inputTwo).toString().length > 9
                ? (inputOne / inputTwo).toString().substring(0, 10)
                : (inputOne / inputTwo).toString()
            } ${inputToken[0].symbol} per ${outputToken[0].symbol}`}</h1>
          </div>
        </div>
      </div>
    );
  }
};

export default PriceEstimator;
