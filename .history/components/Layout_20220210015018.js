import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
const Layout = () => {
  return (
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">DexFi</p>
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
    </div>
  );
};

export default Layout;
