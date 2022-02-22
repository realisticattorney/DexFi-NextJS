import Image from 'next/image';
import React from 'react';

const Home = () => {
  return (
    <div className="w-full grid grid-cols-2 grid-rows-1 mt-32">
      <div className="flex-col px-6">
        <h1 className="text-6xl tracking-wide font-bold text-dexfi-moon">
          The moon is made of pancakes.
        </h1>
        <p className="text-xl font-bold text-dexfi-violet">
          Trade, earn, and win crypto on the most popular decentralized platform
          in the galaxy.
        </p>
        <div className="px-4 w-full bottom-4">
          <button className="w-[166px] bg-pink-500  text-white font-bold py-2.5 px-4 rounded-xl shadow-slate-500 shadow-sm">
            Connect Wallet
          </button>
        </div>
      </div>
      <div className="col-span-1 relative row-span-1 ">
        <div>
          <Image src="/bunnyHome.png" layout="fill" alt="lol" objectFit='contain' />
        </div>
      </div>
    </div>
  );
};

export default Home;
