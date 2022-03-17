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
            <li>Instagram</li>
            <li>Pinterest</li>
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
            <li>Instagram</li>
            <li>Pinterest</li>
            <li>Facebook</li>
            <li>Tik Tok</li>
            <li>Twitter</li>
          </ul>
        </div>
        <div className="inline-flex col-span-1 row-span-1 ">
          <ul className="flex-col space-y-1.7 ">
            <li className="text-violet-500 font-bold">DEVELOPERS</li>
            <li>Instagram</li>
            <li>Pinterest</li>
            <li>Facebook</li>
            <li>Tik Tok</li>
            <li>Twitter</li>
          </ul>
        </div>

        <div className="flex col-span-1 row-span-1 self-start place-self-end">
          <div className="items-center">
            <Image src="/bunny.svg" height={28} width={28} alt="" />
          </div>
          <p className="text-xl font-bold ml-2 tracking-wide">BunnySwap</p>
        </div>
      </div>
      <div className='flex space-x-3'>
      <div className="py-0.4 px-1 rounded-full bg-dexfi-other_gray shadow">
      <TelegramIcon   sx={{
            color: '#27262C',
            fontSize: 20,
            paddingBottom: '0.2rem',
            mar
          }}/>
    </div>
      </div>
    </footer>
  );
};

export default Footer;
