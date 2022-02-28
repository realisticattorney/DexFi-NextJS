import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useWeb3 } from '../components/providers/web3';

const flyingAnim = () => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-15px, -15px);
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
  const { connect, isUserWalletConnected, provider, exchangeBunny } = useWeb3();

  console.log('exchangeBunny', exchangeBunny);
  console.log('provider', provider);
  const defualtExchange = useRef(null);

  useEffect(() => {
    if (exchangeBunny) {
      defualtExchange.current = exchangeBunny.contract;
    }
  }, [exchangeBunny]);

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
            {!isUserWalletConnected && (
              <button
                onClick={() => {
                  connect(defualtExchange.current.address);
                }}
                className="w-[166px] bg-pink-500 active:translate-y-0.1 active:shadow-none active:opacity-90  text-white font-bold py-2.5 px-5 hover:opacity-75 transition-opacity duration-300 rounded-xl shadow-slate-500 shadow-sm "
              >
                Connect Wallet
              </button>
            )}
            <Link href="/swap">
              <a>
                <button className="w-[132px] border-pink-500 border-2 font-bold py-2.5 px-5 rounded-xl shadow-sm text-pink-500 hover:opacity-75 transition-opacity duration-300 active:translate-y-0.1 active:shadow-none active:opacity-90">
                  Trade Now
                </button>
              </a>
            </Link>
          </div>
        </div>
        <BunnyWrapper className="col-span-1 relative row-span-1 z-0">
          <Image
            src="/bunnyHome.png"
            layout="fill"
            alt="lol"
            priority={true}
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
        <div className="heroBackground ">
          <div className="flex-col items-center mx-auto flex">
            <svg
              viewBox="0 0 48 48"
              height="48px"
              width="48px"
              color="text"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.9024 0C10.8947 0 7.87179 3.60289 8.60749 7.50271L10.3484 16.7306C4.45101 19.3061 0 23.7533 0 29.3333V32.7273C0 37.3405 3.08306 41.2029 7.39317 43.8102C11.7369 46.4379 17.6132 48 24 48C30.3868 48 36.2631 46.4379 40.6068 43.8102C44.9169 41.2029 48 37.3405 48 32.7273V29.3333C48 23.7236 43.5028 19.2593 37.5552 16.6889L39.2882 7.50271C40.0239 3.6029 37.001 0 32.9933 0C29.4567 0 26.5896 2.83809 26.5896 6.33904V14.147C25.7386 14.0899 24.8746 14.0606 24 14.0606C23.0897 14.0606 22.1908 14.0923 21.3061 14.1541V6.33904C21.3061 2.83809 18.4391 0 14.9024 0ZM17.8776 28.3637C17.8776 30.372 16.7811 32 15.4286 32C14.0761 32 12.9796 30.372 12.9796 28.3637C12.9796 26.3554 14.0761 24.7273 15.4286 24.7273C16.7811 24.7273 17.8776 26.3554 17.8776 28.3637ZM34.7757 28.3637C34.7757 30.372 33.6792 32 32.3267 32C30.9742 32 29.8777 30.372 29.8777 28.3637C29.8777 26.3554 30.9742 24.7273 32.3267 24.7273C33.6792 24.7273 34.7757 26.3554 34.7757 28.3637Z"
                fill="url(#paint0_linear)"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="24"
                  y1="0"
                  x2="24"
                  y2="48"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#7645D9"></stop>
                  <stop offset="1" stopColor="#5121B1"></stop>
                </linearGradient>
              </defs>
            </svg>
            <h1 className="mt-5 text-4xl text-center w-[311px] font-bold tracking-wide text-dexfi-violet">
              Used by millions.
            </h1>
            <h1 className="text-4xl text-center w-[380px] font-bold tracking-wide text-dexfi-violet">
              Trusted with billions.
            </h1>

            <h2 className="mt-10 text-center w-[500px] font-semibold text-dexfi-violet text-opacity-70">
              PancakeSwap has the most users of any decentralized platform,
              ever.
            </h2>
            <h2 className=" mb-5 text-center w-[580px] font-semibold text-dexfi-violet text-opacity-70">
              And those users are now entrusting the platform with over $12
              billion in funds.
            </h2>
            <h2 className=" mb-8 text-center w-[580px] font-bold text-dexfi-violet text-opacity-75">
              Will you join them?
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 px-5 gap-5 mb-10">
              <div className="bg-white h-[280px] w-[280px] rounded-3xl shadow-sm shadow-slate-300 p-5 ">
                <h1 className="mt-28 text-3xl  font-bold tracking-wide text-dexfi-violet">
                  3.6 million
                </h1>
                <h1 className="text-3xl  font-bold tracking-wide text-dexfi-moon">
                  users
                </h1>
                <h2 className="mt-7 font-semibold text-dexfi-violet text-opacity-70">
                  in the last 30 days.
                </h2>
              </div>
              <div className="bg-white h-[280px] w-[280px] rounded-3xl shadow-sm shadow-slate-300 p-5 ">
                <h1 className="mt-28 text-3xl  font-bold tracking-wide text-dexfi-violet">
                  48 million
                </h1>
                <h1 className="text-3xl  font-bold tracking-wide text-cyan-400">
                  trades
                </h1>
                <h2 className="mt-7 font-semibold text-dexfi-violet text-opacity-70">
                  made in the last 30 days.
                </h2>
              </div>
              <div className="bg-white h-[280px] w-[280px] rounded-3xl shadow-sm shadow-slate-300 p-5 ">
                <div className="relative">
                  <svg
                    viewBox="0 0 24 24"
                    color="#ED4B9E"
                    width="36px"
                    xmlns="http://www.w3.org/2000/svg"
                    className="right-0 absolute text-pink-500"
                  >
                    <path d="M4 13C5.1 13 6 12.1 6 11C6 9.9 5.1 9 4 9C2.9 9 2 9.9 2 11C2 12.1 2.9 13 4 13ZM5.13 14.1C4.76 14.04 4.39 14 4 14C3.01 14 2.07 14.21 1.22 14.58C0.48 14.9 0 15.62 0 16.43V17C0 17.5523 0.447715 18 1 18H4.5V16.39C4.5 15.56 4.73 14.78 5.13 14.1ZM20 13C21.1 13 22 12.1 22 11C22 9.9 21.1 9 20 9C18.9 9 18 9.9 18 11C18 12.1 18.9 13 20 13ZM24 16.43C24 15.62 23.52 14.9 22.78 14.58C21.93 14.21 20.99 14 20 14C19.61 14 19.24 14.04 18.87 14.1C19.27 14.78 19.5 15.56 19.5 16.39V18H23C23.5523 18 24 17.5523 24 17V16.43ZM16.24 13.65C15.07 13.13 13.63 12.75 12 12.75C10.37 12.75 8.93 13.14 7.76 13.65C6.68 14.13 6 15.21 6 16.39V17C6 17.5523 6.44772 18 7 18H17C17.5523 18 18 17.5523 18 17V16.39C18 15.21 17.32 14.13 16.24 13.65ZM8.07 16C8.16 15.77 8.2 15.61 8.98 15.31C9.95 14.93 10.97 14.75 12 14.75C13.03 14.75 14.05 14.93 15.02 15.31C15.79 15.61 15.83 15.77 15.93 16H8.07ZM12 8C12.55 8 13 8.45 13 9C13 9.55 12.55 10 12 10C11.45 10 11 9.55 11 9C11 8.45 11.45 8 12 8ZM12 6C10.34 6 9 7.34 9 9C9 10.66 10.34 12 12 12C13.66 12 15 10.66 15 9C15 7.34 13.66 6 12 6Z"></path>
                  </svg>
                </div>
                <h1 className="mt-28 text-3xl  font-bold tracking-wide text-dexfi-violet">
                  $12 billion
                </h1>
                <h1 className="text-3xl  font-bold tracking-wide text-pink-500">
                  staked
                </h1>
                <h2 className="mt-7 font-semibold text-dexfi-violet text-opacity-70">
                  Total Value Locked
                </h2>
              </div>
              <div className='h'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
