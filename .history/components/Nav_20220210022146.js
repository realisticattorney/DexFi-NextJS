import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
const Nav = () => {
  return (
    <div className="flex border-b border-gray-600 p-3 items-center">
      <Image
        src="/DexFi-logo.png"
        height={100}
        width={200}
        className="svg-stroke"
        alt=""
      />
      {/* <div className="flex mt-4"> */}
      <Link href="/">
        <a className="mx-6 text-gray-500">Home</a>
      </Link>
      <Link href="/exchange">
        <a className="mr-6 text-gray-500">Exchange</a>
      </Link>
      <Link href="/liquidity">
        <a className="mr-6 text-gray-500">Liquidity</a>
      </Link>
      {/* </div> */}
    </div>
  );
};

export default Nav;