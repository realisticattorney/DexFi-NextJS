import Link from 'next/link';

const Subnav = ({ marked }) => {
  return (
    <nav className="bg-white">
      <div className="mx-auto flex w-fit space-x-4">
          <Link href="/swap" []>
        <div
          className={` pt-2.5 pb-1 px-2 hover:bg-gray-100 ${
            marked === 'Exchange' ? 'border-b-4 border-cyan-500' : ''
          }`}
        >
            <a
              className={`${
                marked === 'Exchange'
                  ? 'text-violet-600 font-bold'
                  : 'text-gray-500 font-semibold'
              }`}
            >
              Exchange
            </a>
        </div>
          </Link>
        <div
          className={`pt-2.5 pb-1 px-2 hover:bg-gray-100 ${
            marked === 'Liquidity' ? 'border-b-4 border-cyan-500' : ''
          }`}
        >
          <Link href="/liquidity">
            <a
              className={`${
                marked === 'Liquidity'
                  ? 'text-violet-600 font-bold'
                  : 'text-gray-500 font-semibold'
              }`}
            >
              Liquidity
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Subnav;
