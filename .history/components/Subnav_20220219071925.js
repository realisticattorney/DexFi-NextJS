import Link from 'next/link';

const Subnav = ({ marked }) => {
  return (
    <nav className="bg-white">
      <div className="mx-auto flex w-fit space-x-4">
        <div
          className={` pt-2.5 pb-1 px-2 ${
            marked === 'Exchange' ? 'border-b-4 border-cyan-500}' : ''
          }`}
        >
          <Link href="/">
            <a
              className={`${
                marked === 'Exchange'
                  ? 'text-violet-600 font-bold'
                  : 'text-gray-500 font-semibold'
              }`}
            >
              Exchange
            </a>
          </Link>
        </div>
        <div
          className={`pt-2.5 pb-1 px-2 ${
            marked === 'Liquidity' ? 'border-b-4border-cyan-500}' : ''
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
