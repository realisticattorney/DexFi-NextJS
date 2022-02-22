import Image from 'next/image';
import React from 'react';

const Home = () => {
  return (
    <div className="w-full grid grid-cols-2 grid-rows-1">
    <div></div>
      <div className='col-span-1 relative row-span-1'>
        <Image src="/bunnyHome.png" layout="" alt="lol" />
      </div>
    </div>
  );
};

export default Home;
