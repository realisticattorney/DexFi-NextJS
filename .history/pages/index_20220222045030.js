import Image from 'next/image';
import React from 'react';

const Home = () => {
  return (
    <div className="w-full grid grid-cols-2 grid-rows-1">
    <div className='flex-col'>
      <h1>The moon is made of pancakes</h1>
    </div>
      <div className='col-span-1 relative row-span-1 h-20 flex-grow flex'>
        <Image src="/bunnyHome.png" layout="fill" alt="lol" />
      </div>
    </div>
  );
};

export default Home;
