import Nav from './Nav';
import Web3Provider  from "./providers/web3"
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Web3Provider>
    <div className="flex flex-col flex-grow-1 sm:min-h-screen">
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
