import Image from 'next/image';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const flyingAnim = () => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-5px, -5px);
  }
  to {
    transform: translate(0, 0px);
  }
`;

const BunnyWrapper = styled.div`
  width: 100%;
  animation: ${flyingAnim} 3.5s ease-in-out infinite;
`;

const Home = () => {
  return (
    <div>
      <div className="w-full grid grid-cols-2 grid-rows-1 max-w-[1200px] mx-auto mt-24">
        <div className="flex-col px-6 py-40 flex-grow space-y-6">
          <h1 className="text-6xl tracking-wide font-bold text-dexfi-moon">
            The moon is made of pancakes.
          </h1>
          <p className="text-xl font-bold text-dexfi-violet">
            Trade, earn, and win crypto on the most popular decentralized
            platform in the galaxy.
          </p>
          <div className="space-x-2">
            <button className="w-[166px] bg-pink-500  text-white font-bold py-2.5 px-5 hover:opacity-75 transition-opacity duration-300 rounded-xl shadow-slate-500 shadow-sm">
              Connect Wallet
            </button>
            <button className="w-[132px] border-pink-500 border-2 font-bold py-2.5 px-5 rounded-xl shadow-sm text-pink-500 hover:opacity-75 transition-opacity duration-300">
              Trade Now
            </button>
          </div>
        </div>
          <BunnyWrapper>
            <Image
              src="/bunnyHome.png"
              layout="fill"
              alt="lol"
              objectFit="contain"
            />
          </BunnyWrapper>
        </div>
      </div>
      <div className="h-20 bg-white  heroBackground z-40"></div>
    </div>
  );
};

export default Home;
