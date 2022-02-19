import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMoralis } from 'react-moralis';
import { useEffect } from 'react';

const Nav = () => {
  const { isAuthenticated, authenticate, logout } = useMoralis();

  useEffect(() => {}, [isAuthenticated]);

  return (
    <div className="flex border-b border-gray-300 p-0 items-center">
      {/* <Image
        src="/DexFi-logo.png"
        height={70}
        width={140}
        className="svg-stroke"
        alt=""
      /> */}
      {/* <div className="flex mt-4"> */}
      <div className="-pl-2 -mb-1 pr-3 md:pr-0">
        <Image src="/bunny.svg" height={48} width={48} className="svg-stroke" alt='' />
      </div>
      <div class="sc-jRQBWg sc-gKclnd gREMsN hrZfTH">
      <a href="/" aria-label="Pancake home page" class="sc-c6707b7e-0 jBBcTH sc-gjNHFA dJoqat">
     </a></div>
      <Link href="/">
        <a className="mx-6 text-gray-500 font-semibold">Home</a>
      </Link>
      <Link href="/exchange">
        <a className="mr-6 text-gray-500 font-semibold">Exchange</a>
      </Link>
      <Link href="/liquidity">
        <a className="mr-6 text-gray-500 font-semibold">Liquidity</a>
      </Link>
      {isAuthenticated ? (
        <button
          className="ml-auto mr-6 text-gray-500 font-semibold"
          onClick={logout}
        >
          Logout
        </button>
      ) : (
        <button
          className="ml-auto mr-6 text-gray-500 font-semibold"
          onClick={() =>
            authenticate({
              signingMessage: 'Authorize linking of your wallet',
            })
          }
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Nav;
