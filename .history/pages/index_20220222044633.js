import Image from 'next/image';
import React from 'react';

const Home = () => {
  return (
    <div className="w-full grid grid-cols-2">
    <div></div>
      <div className='col-span-1 relative fu'>
        <Image src="/bunnyHome.png" layout="fill" alt="lol" />
      </div>
    </div>
  );
};

export default Home;
