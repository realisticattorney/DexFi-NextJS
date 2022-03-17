import Link from 'next/link';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const ModalMenu = () => {
  return (
    <div className="inline-flex" id="main_menu">
      <ul
        className="flex flex-wrap p-1 md:p-2  text-sm md:text-base"
        id="menu_nav"
      >
        <li
          className="relative mx-1 px-1 py-2 group hover:bg-gray-100 cursor-pointer rounded-lg mb-0"
          id="button_admin"
        >
          <Link href="/swap">
            <a className="mx-3 text-gray-500 font-semibold">Trade</a>
          </Link>
          <ul className="absolute left-0 top-0 mt-10  w-[280px] rounded-2xl border shadow-sm bg-white z-10 hidden group-hover:block">
            <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <Link href="/swap">
                <a className="mx-3 text-gray-500 font-semibold">Exchange</a>
              </Link>
            </li>
            <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <Link href="/liquidity">
                <a className="mx-3 text-gray-500 font-semibold">Liquidity</a>
              </Link>
            </li>
          </ul>
        </li>
        <li
          className="relative mx-1 px-1 py-2 group hover:bg-gray-100 cursor-pointer rounded-lg mb-0"
          id="button_admin"
        >
          <Link href="/farms">
            <a className="mx-3 text-gray-500 font-semibold">Earn</a>
          </Link>
          <ul className="absolute left-0 top-0 mt-10  w-[280px] rounded-2xl border shadow-sm bg-white z-10 hidden group-hover:block">
            <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <Link href="/farms">
                <a className="mx-3 text-gray-500 font-semibold">Farms</a>
              </Link>
            </li>
            <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <Link href="/pools">
                <a className="mx-3 text-gray-500 font-semibold">Pools</a>
              </Link>
            </li>
          </ul>
        </li>
        <li
          className="relative mx-1 px-1 py-2 group hover:bg-gray-100 cursor-pointer rounded-lg mb-0"
          id="button_admin"
        >
          <Link href="/farms">
            <a className="mx-3 text-gray-500 font-semibold">Earn</a>
          </Link>
          <ul className="absolute left-0 top-0 mt-10  w-[280px] rounded-2xl border shadow-sm bg-white z-10 hidden group-hover:block">
            <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <Link href="/farms">
                <a className="mx-3 text-gray-500 font-semibold">Farms</a>
              </Link>
            </li>
            <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <Link href="/pools">
                <a className="mx-3 text-gray-500 font-semibold">Pools</a>
              </Link>
            </li>
          </ul>
        </li>
        <li
          className="relative mx-1 px-1 py-2 group hover:bg-gray-100 cursor-pointer rounded-lg mb-0"
          id="button_admin"
        >
          <Link href="/farms">
            <a className="mx-3 text-gray-500 font-semibold">Earn</a>
          </Link>
          <ul className="absolute left-0 top-0 mt-10  w-[280px] rounded-2xl border shadow-sm bg-white z-10 hidden group-hover:block">
            <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <Link href="/farms">
                <a className="mx-3 text-gray-500 font-semibold">Farms</a>
              </Link>
            </li>
            <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <Link href="/pools">
                <a className="mx-3 text-gray-500 font-semibold">Pools</a>
              </Link>
            </li>
          </ul>
        </li>
        <li
          className="relative mx-1 px-1 py-2 group hover:bg-gray-100 cursor-pointer rounded-lg mb-0"
          id="button_admin"
        >
          <Link href="/liquidity">
            <a className="mr-6 text-gray-500  font-semibold">
              <MoreHorizIcon sx={{ color: '#6B7280', fontSize: 20 }} />
            </a>
          </Link>
          <ul className="absolute left-0 top-0 mt-10  w-[280px] rounded-2xl border shadow-sm bg-white z-10 hidden group-hover:block">
            <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <Link href="/farms">
                <a className="mx-3 text-gray-500 font-semibold">Farms</a>
              </Link>
            </li>
            <li className="px-2 whitespace-no-wrap h-[48px] flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <Link href="/pools">
                <a className="mx-3 text-gray-500 font-semibold">Pools</a>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default ModalMenu;
