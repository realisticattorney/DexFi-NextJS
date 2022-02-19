import React from 'react';
import Link from 'next/link';
import Nav from './Nav';
import Image from 'next/image';
import { Web3Provider } from "./providers/web3"

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen   ">
      <Nav />
      <main className="h-full w-full flex-grow bg-dexfi-sky">
        {children}
      </main>
      <footer className=" text-white  text-sm font-extralight font-mono  p-5 bg-dexfi-space_gray">
        <div className="grid col-span-3 grid-cols-3 grid-rows-2 h-60 lg:max-w-4xl md:mx-auto md:max-w-2xl md:grid-cols-6 md:grid-rows-1 md:h-40">
          <div className="inline-flex col-span-1 row-span-1 ">
            <ul className="flex-col space-y-1.7 ">
              <li>
                <a
                  href="https://www.instagram.com/shopdeepoe/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.pinterest.com/shopdeepoe"
                  target="_blank"
                  rel="noreferrer"
                >
                  Pinterest
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/shopdeepoe"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@shopdeepoe"
                  target="_blank"
                  rel="noreferrer"
                >
                  Tik Tok
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com/shopdeepoe"
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          <div className="flex-col justify-between">
            <ul className="flex-col  space-y-1.5 ">
              <li>
                <Link href="/contact">
                  <a>Contact Us</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a>About</a>
                </Link>
              </li>
              <li>
                <Link href="/sustainability">
                  <a>Sustainability</a>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <a>FAQ</a>
                </Link>
              </li>

              <li>
                <Link href="/shipping">
                  <a>Shipping</a>
                </Link>
              </li>

              <li>
                <Link href="/product-care">
                  <a>Product Care</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex-col justify-between">
            <ul className="flex-col space-y-1.5  ">
              <li>
                <Link href="/terms">
                  <a>Terms</a>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <a>Privacy</a>
                </Link>
              </li>
              <li>
                <Link href="/accessibility">
                  <a>Accessibility</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex-col text-xs self-end -mb-2">
            <div className="flex-col space-y-0">
              <div className="-pl-2 -mb-1 pr-3 md:pr-0">
                <Image
                  src="/DexFi-logo.png"
                  height={48}
                  width={70}
                  className=""
                  alt=""
                />
              </div>
              <p className="">© 2022 DexFi</p>
            </div>
          </div>

          <div className="self-end -ml-3.5 md:-ml-4">
            <ul className="text-xs flex-col">
              <li className="text-deepoe-cream font-thin text-opacity-70 mb-0.5">
                designed & developed by
              </li>
              <li className="-mb-1.5">
                <a
                  href="https://www.germanaquila.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  German Aquila{' '}
                </a>
              </li>
            </ul>
          </div>
          {/* <div className="self-end">
            <ul className="text-xs flex-col">
              <li className="text-deepoe-cream font-thin text-opacity-70 -mb-1.5">
                a brand of
              </li>
              <li className="-mb-1.5">Mereride Brands, LLC</li>
            </ul>
          </div> */}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
