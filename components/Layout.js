import Nav from './Nav';
import Web3Provider from './providers/web3';
import Footer from './Footer';
import Head from 'next/head';
const Layout = ({ children }) => {
  return (
    <Web3Provider>
      <Head>
        <title>BunnySwap</title>
        <link rel="icon" href="/favicon.svg" />
        <meta property="og:image" content="/bunnyogg.png" />
      </Head>
      <div className="flex flex-col sm:min-h-screen min-w-full w-fit sm:w-full">
        <Nav />
        <main className="h-full w-full flex-grow appBackground">
          {children}
        </main>
        <Footer />
      </div>
    </Web3Provider>
  );
};

export default Layout;
