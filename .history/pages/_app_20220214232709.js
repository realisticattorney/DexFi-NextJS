import '../styles/globals.css';
import Layout from '../components/Layout';
import { MoralisProvider } from 'react-moralis';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <MoralisProvider app>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MoralisProvider>
    </>
  );
}

export default MyApp;
//
//
