import React from 'react'

const PriceEstimator = ({inputOne, inputTwo, inputToken, outputToken}) => {
  return (
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
  )
}

export default PriceEstimator