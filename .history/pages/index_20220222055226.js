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
        <BunnyWrapper className="col-span-1 relative row-span-1">
          <Image
            src="/bunnyHome.png"
            layout="fill"
            alt="lol"
            objectFit="contain"
          />
        </BunnyWrapper>
        
      </div>
      <div className="mt-5">
        <svg viewBox="0 0 1660 339" width="100%" color="text">
          <path
            d="M804 167.023C520.5 167.023 267.5 290.522 0 304.5V339H1660V0.5C1358.83 0.5 1104 167.023 804 167.023Z"
            fill="url(#paint0_linear_light)"
          ></path>
          <defs>
            <linearGradient
              id="paint0_linear_light"
              x1="830"
              y1="84"
              x2="830"
              y2="339"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.48"></stop>
              <stop
                offset="0.566389"
                stopColor="white"
                stopOpacity="0.35"
              ></stop>
              <stop offset="1" stopColor="white"></stop>
            </linearGradient>
          </defs>
        </svg>
        <div className='heroBackground '>
        <div className='flex-col items-center mx-auto flex'>
          <h1 className='text-4xl text-center w-[311px] font-bold tracking-wide text-dexfi-violet'>
            Used by millions.
          </h1>
          <h1 className='text-4xl text-center w-[380px] font-bold tracking-wide text-dexfi-violet'>
            Trusted with billions.
          </h1>
          
          <h2 className='mt-10 text-center w-[500px] font-semibold text-dexfi-violet text-opacity-70'>
          PancakeSwap has the most users of any decentralized platform, ever.
          </h2>
          <h2 className=' mb-5 text-center w-[580px] font-semibold text-dexfi-violet text-opacity-70'>
          And those users are now entrusting the platform with over $12 billion in funds.
          </h2>
          <h2 className=' mb-5 text-center w-[580px] font-bold text-dexfi-violet text-opacity-80'>
          Will you join them?
          </h2>
          <div className='grid grid-cols-1 lg:grid-cols-3 px-5'>
            <div className='bg-white h-[280px] w-[280px]'></div>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
