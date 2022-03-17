import React from 'react'

const SwapPanel = (props) {
   const { currencies } = props;
  return (
   <div className="flex-col ">
   <Subnav marked={'Exchange'} />
   <div className="p-6 mx-auto w-min">
     <div className="flex-col relative py-5 w-[326px] h-[518px] bg-white rounded-3xl border shadow-sm">
<Exchange  />
     </div>
      </div>
    </div>
     
  )
}

export default SwapPanel