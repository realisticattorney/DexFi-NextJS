import { useCallback, useEffect, useRef, useState } from 'react';
import { useWeb3 } from './providers/web3';

const PriceEstimator = ({
  inputOne,
  inputTwo,
  inputToken,
  outputToken,
  section,
  exchange,
  callBondingCurve,
  exchangeCurrent,
}) => {
  const { provider } = useWeb3();
  const [poolNumbers, setPoolNumbers] = useState(null);

  const setPoolNumbersCallback = useCallback((exchange) => {
    setPoolNumbers(exchange);
  }, []);
  console.log('ooooolnumbersss', poolNumbers);
  useEffect(() => {
    if (provider === null || provider === undefined || exchange === null) {
      return;
    }
    async function loadLiquidity() {
      const PoolShare = await callBondingCurve(inputTwo, 'add-liquidity');
      setPoolNumbersCallback(PoolShare);
    }
    loadLiquidity();
  }, [callBondingCurve, setPoolNumbersCallback, provider, inputTwo, exchange]);

  if (section === 'swap') {
    return (
      <>
        {inputOne > 0 && (
          <div className="h-8">
            <div className="flex w-full justify-around">
              <h1 className="text-xs1 font-bold text-violet-700 ml-1.5">Price</h1>
              <h1 className="truncate text-sm mr-1 font-medium text-gray-700">{`${
                (inputOne / inputTwo).toString().length > 9
                  ? (inputOne / inputTwo).toString().substring(0, 10)
                  : (inputOne / inputTwo).toString()
              } ${inputToken[0].symbol} per ${outputToken[0].symbol}`}</h1>
            </div>
          </div>
        )}
        <div className="h-10">
          <div className="flex w-full justify-around">
            <h1 className="text-xs1 font-bold text-violet-700 mr-16">
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
          <div className="flex p-4 rounded-lg  justify-around">
            {inputOne > 0 && (
              <div className="flex font-medium text-violet-900 space-x-6">
                <div className="text-center">
                  <h1 className="truncate">
                    {(exchangeCurrent. / poolNumbers[1])
                      .toString()
                      .substring(0, 8)}
                  </h1>
                  <h1 className="text-sm">{`${inputToken[0].symbol} per ${outputToken[0].symbol}`}</h1>
                </div>
                <div className="text-center">
                  <h1 className="truncate">
                    {(poolNumbers[1] / poolNumbers[0])
                      .toString()
                      .substring(0, 8)}
                  </h1>
                  <h1 className="text-sm">{`${outputToken[0].symbol} per ${inputToken[0].symbol}`}</h1>
                </div>
                <div className="text-center">
                  <h1 className="truncate">
                    {poolNumbers[2].toFixed(2).toString()}%
                  </h1>
                  <h1 className="text-sm">Share of Pool</h1>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default PriceEstimator;
