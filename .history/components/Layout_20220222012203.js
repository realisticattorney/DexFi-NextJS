import React from 'react';
import Link from 'next/link';
import Nav from './Nav';
import Image from 'next/image';
import Web3Provider  from "./providers/web3"
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Web3Provider>
    <div className="flex flex-col min-h-screen   ">
      <Nav />
      <main className="h-full w-full flex-grow bg-dexfi-sky">
        {children}
      </main>
      <Footer />
    </div>
    </Web3Provider>
  );
};

export default Layout;
