import Image from 'next/image';
import Link from 'next/link';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import RedditIcon from '@mui/icons-material/Reddit';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useWeb3 } from '../components/providers/web3';

const Footer = () => {
  const { exchangeBunny } = useWeb3();
  return (
    <footer className=" text-white  font-medium  p-5 bg-dexfi-space_gray">
      <div className="grid col-span-3 grid-cols-1 mx-6 auto-rows-auto grid-rows-4   md:grid-cols-4 md:grid-rows-1 mt-8">
        <div className="inline-flex col-span-1 row-span-1 ">
          <ul className="flex-col space-y-1.7 ">
            <li className="text-violet-500 font-bold">ABOUT</li>
            <li className="hover:underline cursor-pointer">Contact</li>
            <li className="hover:underline cursor-pointer">Brand</li>
            <li className="hover:underline cursor-pointer">Blog</li>
            <li className="hover:underline cursor-pointer">Community</li>
            <li className="hover:underline cursor-pointer">SCAM Token</li>
            <li className="tracking-tighter">--</li>
            <li className="text-yellow-500">Online Store</li>
          </ul>
        </div>
        <div className="inline-flex col-span-1 row-span-1 ">
          <ul className="flex-col space-y-1.7 ">
            <li className="text-violet-500 font-bold">HELP</li>
            <li className="hover:underline cursor-pointer">Customer Support</li>
            <li className="hover:underline cursor-pointer">Troubleshooting</li>
            <li className="hover:underline cursor-pointer">Guides</li>
          </ul>
        </div>
        <div className="inline-flex col-span-1 row-span-1 ">
          <ul className="flex-col space-y-1.7 ">
            <li className="text-violet-500 font-bold">DEVELOPERS</li>
            <li className="hover:underline cursor-pointer">Github</li>
            <li className="hover:underline cursor-pointer">Documentation</li>
            <li className="hover:underline cursor-pointer">Bug Bounty</li>
            <li className="hover:underline cursor-pointer">Audits</li>
            <li className="hover:underline cursor-pointer">Careers</li>
          </ul>
        </div>

        <div className="flex col-span-1 row-span-1 self-start sm:place-self-end">
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
      <div className="flex justify-between py-9 pb-4">
        <div></div>
        <div className="items-center flex">
          <Link href={`/swap`} passHref>
            <div className="flex mx-5 space-x-2 cursor-pointer scaleFirstChild transition-transform duration-75 ">
              <Image
                src="/logo.png"
                height={24}
                width={26}
                alt=""
                className=""
              />
              <h2 className="text-dexfi-other_gray mt-0.1 pt-0.1 font-bold">
                ${(exchangeBunny?.reserve / exchangeBunny?.balance).toFixed(3)}
              </h2>
            </div>
          </Link>
          <Link href="/swap">
            <a>
              <button className=" text-white font-bold py-1 px-4 shadow-sm tracking-wide bg-pink-500 rounded-full hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90 mr-6">
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
