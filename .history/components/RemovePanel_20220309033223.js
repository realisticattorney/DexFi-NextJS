import Exchange from '../utils/Exchange.json';
import { ethers } from 'ethers';
import { useState, useEffect, useCallback } from 'react';
import { useWeb3 } from '../components/providers/web3';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Image from 'next/image';
import Web3Modal from 'web3modal';
import ERC20Token from '../utils/ERC20Token.json';
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RemovePanel = ({ address, currency, backCurrency }) => {
  const { exchangeCurrent } = useWeb3();
  const { contract, balance, reserve, totalSupply } = exchangeCurrent;
  const [userLps, setUserLps] = useState(0);
  const [userLpsToRemove, setUserLpsToRemove] = useState(0);
  const [expectedWithdrawn, setExpectedWithdrawn] = useState([0, 0, 0]);
  console.log('exchangeCurrent', exchangeCurrent);
  const handleSliderChange = (event, newValue) => {
    setUserLpsToRemove(newValue);
    returnsEstimator(newValue);
  };
  const handleInputChange = (event) => {
    if (event.target?.value) {
      setUserLpsToRemove(
        event.target.value === '' ? 0 : Number(event.target.value)
      );
      returnsEstimator(event.target.value);
    } else {
      setUserLpsToRemove(event);
      returnsEstimator(event);
    }
  };

  useEffect(() => {
    const loadExchange = async () => {
      const userLPTokens = ethers.utils.formatEther(
        await contract.balanceOf(address)
      );
      setUserLps(userLPTokens);
    };

    contract && loadExchange();
  }, [address, contract]);

  const returnsEstimator = useCallback(
    (userLpsToRemove) => {
      let lps = (userLps * userLpsToRemove) / 100;
      const ethWithdrawn = (balance * lps) / totalSupply;
      const tokenWithdrawn = (reserve * lps) / totalSupply;

      setExpectedWithdrawn([ethWithdrawn, tokenWithdrawn, lps]);
    },
    [userLps, balance, totalSupply, reserve]
  );

  async function remove() {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const tokenUserConnection = new ethers.Contract(
      currency.address,
      ERC20Token.abi,
      signer
    );
    const exchangeUserConnection = new ethers.Contract(
      contract.address,
      Exchange.abi,
      signer
    );

    const wasApproved = await tokenUserConnection.approve(
      contract.address,
      ethers.utils.parseEther(expectedWithdrawn[2].toString())
    );
    await toast.promise(wasApproved.wait(), {
      pending: 'Approve is pending',
      success: 'Approve resolved 👌',
      error: 'Approve rejected 🤯',
    });
    console.log('was approved?', wasApproved);
    const allowanceAmount = ethers.utils.formatEther(
      await tokenUserConnection.allowance(
        await signer.getAddress(),
        contract.address
      )
    );

    console.log('allowanceAmount', allowanceAmount);

    if (allowanceAmount === '0') {
      toast.error('No allowance');
      return;
    }

    if (allowanceAmount < expectedWithdrawn[2].toString()) {
      toast.error(
        `No enough allowance ${allowanceAmount} for ${expectedWithdrawn[2].toString()} amount`
      );
      return;
    }

    let transaction = await toast.promise(exchangeUserConnection.removeLiquidity(
      ethers.utils.parseEther(expectedWithdrawn[2].toString())
    ),{})
    console.log('transaction', transaction);
    if (transaction.hash) {
      Router.push('/');
    }
  }

  return (
    <div className="flex flex-col p-5">
      <div className="flex justify-between mx-2">
        <h2 className="text-dexfi-grayviolet text-sm font-medium">Amount</h2>
        <h2 className="font-bold text-sm text-dexfi-cyan">Detailed</h2>
      </div>
      <div className="border my-4 px-4 py-3 rounded-2xl ">
        <Box sx={{ width: 'full', marginLeft: '3px', marginRight: '5px' }}>
          <h1 className="text-4xl font-bold text-dexfi-violet mb-2.5">
            {userLpsToRemove}%
          </h1>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                value={
                  typeof userLpsToRemove === 'number' ? userLpsToRemove : 0
                }
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
                sx={{
                  color: '#1FC7D4',
                  height: '9px',
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <div className="flex justify-between mt-2.5 mx-2 mb-1.5">
          <button
            className={`shadow-sm py-0.5 px-4    rounded-3xl font-bold hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90 ${
              userLpsToRemove === 25
                ? ' text-white bg-dexfi-cyan'
                : 'text-dexfi-cyan bg-gray-100'
            }`}
            onClick={() => {
              handleInputChange(25);
            }}
          >
            25%
          </button>
          <button
            className={`shadow-sm py-0.5 px-4    rounded-3xl font-bold hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90 ${
              userLpsToRemove === 50
                ? ' text-white bg-dexfi-cyan'
                : 'text-dexfi-cyan bg-gray-100'
            }`}
            onClick={() => {
              handleInputChange(50);
            }}
          >
            50%
          </button>
          <button
            className={`shadow-sm py-0.5 px-4    rounded-3xl font-bold hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90 ${
              userLpsToRemove === 75
                ? ' text-white bg-dexfi-cyan'
                : 'text-dexfi-cyan bg-gray-100'
            }`}
            onClick={() => {
              handleInputChange(75);
            }}
          >
            75%
          </button>
          <button
            className={`shadow-sm py-0.5 px-4    rounded-3xl font-bold hover:opacity-75 transition-opacity duration-150 active:translate-y-0.1 active:shadow-none active:opacity-90 ${
              userLpsToRemove === 100
                ? ' text-white bg-dexfi-cyan'
                : 'text-dexfi-cyan bg-gray-100'
            }`}
            onClick={() => {
              handleInputChange(100);
            }}
          >
            Max
          </button>
        </div>
      </div>
      <div className="flex text-center justify-center -mt-2">
        <ArrowDownwardIcon
          sx={{
            color: '#7A6EAA',
            fontSize: '22px',
          }}
        />
      </div>
      <h1 className="text-xs text-dexfi-grayviolet font-bold mt-2">
        YOU WILL RECEIVE
      </h1>
      <div className="my-2 bg-gray-100 w-full p-4 border border-slate-200 rounded-2xl">
        <div className="flex justify-between">
          <div className="flex">
            <Image
              src={currency.logoURI}
              height={20}
              width={20}
              quality={50}
              alt=""
            />
            <h1 className="ml-2 font-medium text-sm text-dexfi-grayviolet">
              {currency.symbol}
            </h1>
          </div>
          <p className="font-medium text-sm text-dexfi-grayviolet">
            {expectedWithdrawn[1].toFixed(2)}
          </p>
        </div>
        <div className="flex justify-between mt-2.5">
          <div className="flex">
            <Image
              src={backCurrency.logoURI}
              height={20}
              width={20}
              quality={50}
              alt=""
            />
            <h1 className="ml-2 font-medium text-sm text-dexfi-grayviolet">
              {backCurrency.symbol}
            </h1>
          </div>
          <p className="font-medium text-sm text-dexfi-grayviolet">
            {expectedWithdrawn[0].toFixed(2)}
          </p>
        </div>
      </div>
      <h1 className="text-xs text-dexfi-grayviolet font-bold mt-2">PRICES</h1>
      <div className="mt-2 bg-gray-100 w-full p-4 border border-slate-200 rounded-2xl">
        <div className="flex justify-between">
          <h1 className="font-medium text-sm text-dexfi-grayviolet">
            1 {currency.symbol}
          </h1>
          <p className="font-medium text-sm text-dexfi-grayviolet">
            {(balance / reserve).toFixed(8)} {backCurrency.symbol}
          </p>
        </div>
        <div className="flex justify-between mt-1">
          <h1 className="font-medium text-sm text-dexfi-grayviolet">1 WETH</h1>
          <p className="font-medium text-sm text-dexfi-grayviolet">
            {(reserve / balance).toFixed(8)} {currency.symbol}
          </p>
        </div>
      </div>
      <button
        className="w-full hover:opacity-75 mt-3 transition-opacity duration-150  bg-dexfi-cyan shadow-sm text-white font-bold py-2 px-12 rounded-xl active:translate-y-0.1 active:shadow-none active:opacity-90"
        onClick={() => {
          remove();
        }}
      >
        Remove Liquidity
      </button>
      <ToastContainer />
    </div>
  );
};

export default RemovePanel;
