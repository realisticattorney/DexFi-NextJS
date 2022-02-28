import Link from 'next/link';

const Subnav = ({ marked }) => {
  return (
    <nav className="bg-white">
      <div className="mx-auto flex w-fit space-x-4">
          <Link href="/swap" >
        <a
          className={` pt-2.5 pb-1 px-2 hover:bg-gray-100 ${
            marked === 'Exchange' ? 'border-b-4 border-cyan-500' : ''
          }`}
        >
            <p
              className={`${
                marked === 'Exchange'
                  ? 'text-violet-600 font-bold'
                  : 'text-gray-500 font-semibold'
              }`}
            >
              Exchange
            </p>
        </a>
          </Link>
          <Link href="/liquidity">
        <div
          className={`pt-2.5 pb-1 px-2 hover:bg-gray-100 ${
            marked === 'Liquidity' ? 'border-b-4 border-cyan-500' : ''
          }`}
        >
            <a
              className={`${
                marked === 'Liquidity'
                  ? 'text-violet-600 font-bold'
                  : 'text-gray-500 font-semibold'
              }`}
            >
              Liquidity
            </a>
        </div>
          </Link>
      </div>
    </nav>
  );
};

export default Subnav;
