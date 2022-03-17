import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMoralis } from 'react-moralis';
import { useEffect } from 'react';

const Nav = () => {
  const { isAuthenticated, authenticate, logout } = useMoralis();

  useEffect(() => {}, [isAuthenticated]);

  return (
    <div className="flex border-b-1.5 border-gray-200 p-0 items-center">
      <div className="p-3 pb-1.3 mr-2">
        <Link href="/">
          <a>
            <Image src="/bunny.svg" height={32} width={32} alt="" />
          </a>
        </Link>
      </div>
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
