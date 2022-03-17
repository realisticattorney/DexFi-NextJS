import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import RedditIcon from '@mui/icons-material/Reddit';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <footer className=" text-white  font-medium  p-5 bg-dexfi-space_gray">
      <div className="grid col-span-3 grid-cols-1 mx-6 grid-rows-4   md:grid-cols-4 md:grid-rows-1 mt-8">
        <div className="inline-flex col-span-1 row-span-1 ">
          <ul className="flex-col space-y-1.7 ">
            <li className="text-violet-500 font-bold">ABOUT</li>
            <li>Contact</li>
            <li>Brand</li>
            <li>Facebook</li>
            <li>Tik Tok</li>
            <li>Twitter</li>
            <li className="tracking-tighter">--</li>
            <li className="text-yellow-500">Online Store</li>
          </ul>
        </div>
        <div className="inline-flex col-span-1 row-span-1 ">
          <ul className="flex-col space-y-1.7 ">
            <li className="text-violet-500 font-bold">HELP</li>
            <li>Customer Support</li>
            <li>Troubleshooting</li>
            <li>Guides</li>
          </ul>
        </div>
        <div className="inline-flex col-span-1 row-span-1 ">
          <ul className="flex-col space-y-1.7 ">
            <li className="text-violet-500 font-bold">DEVELOPERS</li>
            <li>Github</li>
            <li>Documentation</li>
            <li>Bug Bounty</li>
            <li>Audits</li>
            <li>Careers</li>
          </ul>
        </div>

        <div className="flex col-span-1 row-span-1 self-start place-self-end">
          <div className="items-center">
            <Image src="/bunny.svg" height={28} width={28} alt="" />
          </div>
          <p className="text-xl font-bold ml-2 tracking-wide">BunnySwap</p>
        </div>
      </div>

      <div className="flex space-x-6 items-center px-6 pt-10 pb-7 w-full border-b border-gray-700">
        <div className="rounded-full shadow">
          <TwitterIcon
            sx={{
              color: '#B8ADD2',
              fontSize: 24,
            }}
          />
        </div>
        <div className="px-0.5 rounded-full bg-dexfi-other_gray shadow">
          <TelegramIcon
            sx={{
              color: '#27262C',
              fontSize: 20,
              paddingBottom: '0.2rem',
              paddingRight: '0.1rem',
            }}
          />
        </div>
        <div className="px-0.5 rounded-full bg-dexfi-other_gray shadow">
          <RedditIcon
            sx={{
              color: '#27262C',
              fontSize: 20,
              paddingBottom: '0.2rem',
            }}
          />
        </div>
        <div className="rounded-full shadow">
          <InstagramIcon
            sx={{
              color: '#B8ADD2',
              fontSize: 24,
            }}
          />
        </div>
        <div className="rounded-full shadow">
          <GitHubIcon
            sx={{
              color: '#B8ADD2',
              fontSize: 24,
            }}
          />
        </div>
      </div>
      <div className="flex justify-between pt-9 pb-4">
        <div></div>
        <div className="items-center flex">
          <Link href="/swap">
            <a>
              <button className=" text-white font-bold py-1 px-4 shadow-sm tracking-wide bg-pink-500 rounded-full hover:opacity-75 transition-opacity duration-200 active:translate-y-0.1 active:shadow-none active:opacity-90">
                Buy SCAM -{'>'}
              </button>
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
