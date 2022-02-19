import Link from 'next/link';

const Subnav = () => {
  return (
    <div className="flex-col ">
      <nav className="bg-white">
        <div className="mx-auto flex w-fit space-x-4">
          <div className="border-b-4 pt-2.5 pb-1 px-2 border-cyan-500">
            <Link href="/liquidity">
              <a className="text-violet-600 font-bold ">Exchange</a>
            </Link>
          </div>
          <div className="pt-2.5 pb-1 px-2 ">
            <Link href="/liquidity">
              <a className="text-gray-500 font-semibold ">Liquidity</a>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Subnav;
