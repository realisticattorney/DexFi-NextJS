import React from 'react';
import MenuPanel from './MenuPanel';
import Subnav from './Subnav';
import SwapUpperSection from './SwapUpperSection';

const SwapPanel = ({ currencies }) => {
  return (
    <div className="p-6 mx-auto w-min">
      <div className="flex-col relative py-5 w-[326px] h-[518px] bg-white rounded-3xl border shadow-sm">
        <SwapUpperSection />
        <MenuPanel currencies={currencies} />
      </div>
    </div>
  );
};

export default SwapPanel;
