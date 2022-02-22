import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className=" text-white  font-medium  p-5 bg-dexfi-space_gray">
      <div className="grid col-span-3 grid-cols-1 mx-6 grid-rows-4   md:grid-cols-4 md:grid-rows-1 mt-8">
        <div className="inline-flex col-span-1 row-span-1 ">
          <ul className="flex-col space-y-1.7 ">
            <li className='text-violet-500 font-bold'>ABOUT</li>
            <li>Instagram</li>
            <li>Pinterest</li>
            <li>Facebook</li>
            <li>Tik Tok</li>
            <li>Twitter</li>
          </ul>
        </div>

        <div className="flex-col col-span-1 row-span-1">
          <ul className="flex-col  space-y-1.5 ">
          <li className='text-violet-500 font-bold'>HELP</li>
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
          <li className='text-violet-500 font-bold'>DEVELOPERS</li>
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
        <div className="flex-col md:pl-20">
          <div className="flex-col space-y-0">
            <div className="">
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


      </div>
    </footer>
  );
};

export default Footer;
