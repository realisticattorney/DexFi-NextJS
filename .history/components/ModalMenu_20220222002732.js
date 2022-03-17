const ModalMenu = () => {
  return (
    <div className="inline-flex" id="main_menu">
      <ul
        className="flex flex-wrap p-1 md:p-2 sm:bg-gray-300 sm:rounded-full text-sm md:text-base"
        id="menu_nav"
      >
        <li
          className="relative mx-1 px-1 py-2 group bg-gray-300 rounded-full mb-1 md:mb-0"
          id="button_home"
        >
          <a
            className="font-semibold whitespace-no-wrap text-blue-600 hover:text-blue-800"
            href="http://www.italiansubs.local:8081/forum/index.php"
          >
            <span className="last firstlevel">Indice</span>
          </a>
        </li>
        <li
          className="relative mx-1 px-1 py-2 group bg-gray-300 rounded-full mb-1 md:mb-0"
          id="button_admin"
        >
          <a
            className="font-semibold whitespace-no-wrap text-gray-600 hover:text-blue-800"
            href="http://www.italiansubs.local:8081/forum/index.php?action=admin"
          >
            <span className="firstlevel">Amministra</span>
          </a>
          <ul className="absolute left-0 top-0 mt-10 p-2 rounded-lg shadow-lg bg-white z-10 hidden group-hover:block">
            <svg
              className="block fill-current text-white w-4 h-4 absolute left-0 top-0 ml-3 -mt-3 z-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            </svg>
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
          className="relative mx-1 px-1 py-2 group bg-gray-300 rounded-full mb-1 md:mb-0"
          id="button_moderate"
        >
          <a
            className="font-semibold whitespace-no-wrap text-gray-600 hover:text-blue-800"
            href="http://www.italiansubs.local:8081/forum/moderate/"
          >
            <span className="firstlevel">Modera</span>
          </a>
          <ul className="absolute left-0 top-0 mt-10 p-2 rounded-lg shadow-lg bg-white z-10 hidden group-hover:block">
            <svg
              className="block fill-current text-white w-4 h-4 absolute left-0 top-0 ml-3 -mt-3 z-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            </svg>
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
          className="relative mx-1 px-1 py-2 group bg-gray-300 rounded-full mb-1 md:mb-0"
          id="button_profile"
        >
          <a
            className="font-semibold whitespace-no-wrap text-gray-600 hover:text-blue-800"
            href="http://www.italiansubs.local:8081/forum/profile/"
          >
            <span className="firstlevel">Profilo</span>
          </a>
          <ul className="absolute left-0 top-0 mt-10 p-2 rounded-lg shadow-lg bg-white z-10 hidden group-hover:block">
            <svg
              className="block fill-current text-white w-4 h-4 absolute left-0 top-0 ml-3 -mt-3 z-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            </svg>
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
        <li
          className="relative mx-1 px-1 py-2 group bg-gray-300 rounded-full mb-1 md:mb-0"
          id="button_pm"
        >
          <a
            className="font-semibold whitespace-no-wrap text-gray-600 hover:text-blue-800"
            href="http://www.italiansubs.local:8081/forum/pm/"
          >
            <span className="firstlevel">Messaggi privati</span>
          </a>
          <ul className="absolute left-0 top-0 mt-10 p-2 rounded-lg shadow-lg bg-white z-10 hidden group-hover:block">
            <svg
              className="block fill-current text-white w-4 h-4 absolute left-0 top-0 ml-3 -mt-3 z-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            </svg>
            <li className="p-1 whitespace-no-wrap rounded-full text-sm md:text-base text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <a
                className="px-2 py-1"
                href="http://www.italiansubs.local:8081/forum/pm/"
              >
                <span className="">Leggi i tuoi messaggi</span>
              </a>
            </li>
            <li className="p-1 whitespace-no-wrap rounded-full text-sm md:text-base text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <a
                className="px-2 py-1"
                href="http://www.italiansubs.local:8081/forum/pm/?sa=send"
              >
                <span className="">Invia un messaggio privato</span>
              </a>
            </li>
          </ul>
        </li>
        <li
          className="relative mx-1 px-1 py-2 group bg-gray-300 rounded-full mb-1 md:mb-0"
          id="button_like"
        >
          <a
            className="font-semibold whitespace-no-wrap text-gray-600 hover:text-blue-800"
            href="http://www.italiansubs.local:8081/forum/profile/?area=showposts;sa=liked"
          >
            <span className="firstlevel">Like Ricevuti</span>
          </a>
        </li>
        <li
          className="relative mx-1 px-1 py-2 group bg-gray-300 rounded-full mb-1 md:mb-0"
          id="button_mlist"
        >
          <a
            className="font-semibold whitespace-no-wrap text-gray-600 hover:text-blue-800"
            href="http://www.italiansubs.local:8081/forum/mlist/"
          >
            <span className="firstlevel">Utenti</span>
          </a>
          <ul className="absolute left-0 top-0 mt-10 p-2 rounded-lg shadow-lg bg-white z-10 hidden group-hover:block">
            <svg
              className="block fill-current text-white w-4 h-4 absolute left-0 top-0 ml-3 -mt-3 z-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            </svg>
            <li className="p-1 whitespace-no-wrap rounded-full text-sm md:text-base text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <a
                className="px-2 py-1"
                href="http://www.italiansubs.local:8081/forum/mlist/"
              >
                <span className="">Visualizza la lista degli utenti</span>
              </a>
            </li>
            <li className="p-1 whitespace-no-wrap rounded-full text-sm md:text-base text-gray-600 hover:text-gray-800 hover:bg-gray-100">
              <a
                className="px-2 py-1"
                href="http://www.italiansubs.local:8081/forum/mlist/?sa=search"
              >
                <span className="">Cerca utente</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default ModalMenu;
