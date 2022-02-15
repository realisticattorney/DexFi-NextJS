import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMoralis } from 'react-moralis';

const Nav = () => {
  const { isAuthenticated, authenticate } = useMoralis();

  return (
    <div className="flex border-b border-gray-300 p-0 items-center">
      <Image
        src="/DexFi-logo.png"
        height={70}
        width={140}
        className="svg-stroke"
        alt=""
      />
      {/* <div className="flex mt-4"> */}
      <Link href="/">
        <a className="mx-6 text-gray-500 font-semibold">Home</a>
      </Link>
      <Link href="/exchange">
        <a className="mr-6 text-gray-500 font-semibold">Exchange</a>
      </Link>
      <Link href="/liquidity">
        <a className="mr-6 text-gray-500 font-semibold">Liquidity</a>
      </Link>
      <div>
      <button className=''>
        {isAuthenticated ? "Logout" : "Login"}
      </button>
      </div>
    </div>
  );
};

export default Nav;
