import React, { useEffect, useRef } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from './providers/web3';

const PriceEstimator = ({
  inputOne,
  inputTwo,
  inputToken,
  outputToken,
  section,
  exchange,
  callBondingCurve,
}) => {
  const { provider } = useWeb3();
  const poolNumbers = useRef(null);

  useEffect(() => {
    if (provider === null || provider === undefined || exchange === null) {
      return;
    }
    async function loadLiquidity() {
      const PoolShare = await callBondingCurve(
        inputTwo,
        'add-liquidity'
      );
      poolNumbers.current = PoolShare;
      console.log("pooooooooollll",poolNumbers.current)
    }
    loadLiquidity();
  }, [inputTwo,provider, exchange, callBondingCurve]);

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
      <div className="p-6 pt-0">
        <div className="h-[136px] rounded-lg w-full shadow-sm  flex-col">
          <h1 className="text-sm p-4  font-semibold text-dexfi-violet">
            Prices and pool share
          </h1>
          <div className="flex p-4 rounded-lg shadow-sm justify-around">
          {poolNumbers.current?.[3] !== NaN && (
            <div>
            <h1 className="truncate text-sm">{`${
              (inputOne / inputTwo).toString().length > 9
                ? (inputOne / inputTwo).toString().substring(0, 10)
                : (inputOne / inputTwo).toString()
            } ${inputToken[0].symbol} per ${outputToken[0].symbol}`}</h1>
            <h1 className="truncate text-sm">{`${
              (inputOne / inputTwo).toString().length > 9
                ? (inputOne / inputTwo).toString().substring(0, 10)
                : (inputOne / inputTwo).toString()
            } ${inputToken[0].symbol} per ${outputToken[0].symbol}`}</h1>
            </div>
          )}
          </div>
        </div>
      </div>
    );
  }
};

export default PriceEstimator;
