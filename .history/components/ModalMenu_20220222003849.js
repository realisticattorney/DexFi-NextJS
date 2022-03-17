import Link from "next/link";

const ModalMenu = () => {
  return (
    <div className="inline-flex" id="main_menu">
      <ul
        className="flex flex-wrap p-1 md:p-2  text-sm md:text-base"
        id="menu_nav"
      >
        <li
          className="relative mx-1 px-1 py-2 group hover:bg-gray-100 cursor-pointer rounded-lg mb-1 mb-0"
          id="button_admin"
        >
          <Link href="/swap">
            <a className="mx-3 text-gray-500 font-semibold">Trade</a>
          </Link>
          <ul className="absolute left-0 top-0 mt-10 p-2 w-[280px] rounded-lg shadow-lg bg-white z-10 hidden group-hover:block">
          {/* <div className="h-[20px]"></div> */}
            <li className="p-1 whitespace-no-wrap rounded-full text-sm md:text-base text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <a
                className="px-2 py-1"
                href="http://www.italiansubs.local:8081/forum/index.php?action=admin;area=featuresettings"
              >
                <span className="">Funzioni ed opzioni</span>
              </a>
            </li>
            <li className="p-1 whitespace-no-wrap rounded-full text-sm md:text-base text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <a
                className="px-2 py-1"
                href="http://www.italiansubs.local:8081/forum/index.php?action=admin;area=packages"
              >
                <span className="">Gestore Pacchetti</span>
              </a>
            </li>
            <li className="p-1 whitespace-no-wrap rounded-full text-sm md:text-base text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <a
                className="px-2 py-1"
                href="http://www.italiansubs.local:8081/forum/index.php?action=admin;area=permissions"
              >
                <span className="">Permessi</span>
              </a>
            </li>
          </ul>
        </li>
        <li
          className="relative mx-1 px-1 py-2 group hover:bg-gray-100 rounded-lg mb-1 md:mb-0"
          id="button_moderate"
        >
          <a
            className="font-semibold whitespace-no-wrap text-gray-600 hover:text-blue-800"
            href="http://www.italiansubs.local:8081/forum/moderate/"
          >
            <span className="firstlevel">Modera</span>
          </a>
          <ul className="absolute left-0 top-0 mt-10 p-2 rounded-lg shadow-lg bg-white z-10 hidden group-hover:block">
            <li className="p-1 whitespace-no-wrap rounded-full text-sm md:text-base text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <a
                className="px-2 py-1"
                href="http://www.italiansubs.local:8081/forum/moderate/?area=modlog"
              >
                <span className="">Registro moderazione</span>
              </a>
            </li>
            <li className="p-1 whitespace-no-wrap rounded-full text-sm md:text-base text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <a
                className="px-2 py-1"
                href="http://www.italiansubs.local:8081/forum/moderate/?area=reports"
              >
                <span className="">Post segnalati</span>
              </a>
            </li>
          </ul>
        </li>
        <li
          className="relative mx-1 px-1 py-2 group hover:bg-gray-100 rounded-lg mb-1 md:mb-0"
          id="button_profile"
        >
          <a
            className="font-semibold whitespace-no-wrap text-gray-600 hover:text-blue-800"
            href="http://www.italiansubs.local:8081/forum/profile/"
          >
            <span className="firstlevel">Profilo</span>
          </a>
          <ul className="absolute left-0 top-0 mt-10 p-2 rounded-lg shadow-lg bg-white z-10 hidden group-hover:block">
            <li className="p-1 whitespace-no-wrap rounded-full text-sm md:text-base text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <a
                className="px-2 py-1"
                href="http://www.italiansubs.local:8081/forum/profile/"
              >
                <span className="">Sommario</span>
              </a>
            </li>
            <li className="p-1 whitespace-no-wrap rounded-full text-sm md:text-base text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <a
                className="px-2 py-1"
                href="http://www.italiansubs.local:8081/forum/profile/?area=account"
              >
                <span className="">Impostazioni account</span>
              </a>
            </li>
            <li className="p-1 whitespace-no-wrap rounded-full text-sm md:text-base text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <a
                className="px-2 py-1"
                href="http://www.italiansubs.local:8081/forum/profile/?area=forumprofile"
              >
                <span className="">Profilo forum</span>
              </a>
            </li>
            <li className="p-1 whitespace-no-wrap rounded-full text-sm md:text-base text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <a
                className="px-2 py-1"
                href="http://www.italiansubs.local:8081/forum/profile/?area=mentions"
              >
                <span className="">Tag</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default ModalMenu;
