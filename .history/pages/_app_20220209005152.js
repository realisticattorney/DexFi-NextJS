import '../styles/globals.css';
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">Dexfi</p>
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
          {/* <Link href="/creator-dashboard">
            <a className="mr-6 text-pink-500">Creator Dashboard</a>
          </Link> */}
        </div>
      </nav>

      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
//
//
