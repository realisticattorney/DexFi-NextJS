import React from 'react';
import Link from 'next/link';

const Nav = () => {
  return (
    <div>
      <nav className="border-b p-6">
        <Image
          src="/DexFi-logo.png"
          height={48}
          width={70}
          className="svg-stroke"
          alt=""
        />
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-6 text-pink-500">Home</a>
          </Link>
          <Link href="/exchange">
            <a className="mr-6 text-pink-500">Exchange</a>
          </Link>
          <Link href="/liquidity">
            <a className="mr-6 text-pink-500">Liquidity</a>
          </Link>
        </div>
      </nav>
      ;
    </div>
  );
};

export default Nav;
