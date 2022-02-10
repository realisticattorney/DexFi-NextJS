import '../styles/globals.css';
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  return (
    <div>
 
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;
//
//
