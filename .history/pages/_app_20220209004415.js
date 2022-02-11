import '../styles/globals.css';
import Link from 'next/link';
function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">Metaverse Marketplace</p>
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-6 text-pink-500">Home</a>
          </Link>
          <Link href="/create-item">
            <a className="mr-6 text-pink-500">Sell Digital Asset</a>
          </Link>
          <Link href="/my-assets">
            <a className="mr-6 text-pink-500">My Digital Assets</a>
          </Link>
          <Link href="/creator-dashboard">
            <a className="mr-6 text-pink-500">Creator Dashboard</a>
          </Link>
        </div>
      </nav>

      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
// kbMarket deployed to: 0xE7a60604B471e9a97Cb06D0F5f5651057401f47D
// nft deployed to: 0x97023348fB8b32C816E6d56D5e2041188b85489E