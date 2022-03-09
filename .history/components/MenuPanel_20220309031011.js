import { ethers } from 'ethers';
import { useState, useEffect, useRef, useCallback } from 'react';
import Web3Modal from 'web3modal';
import MenuItemList from './MenuItemList.js';
import { useWeb3 } from './providers/web3';
import { scammExchangeAddress } from '../config-local.js';
import ERC20Token from '../utils/ERC20Token.json';
import Exchange from '../utils/Exchange.json';
import SwitchIcon from './SwitchIcon.js';
import PriceEstimator from './PriceEstimator.js';
import WarningIcon from '@mui/icons-material/Warning';
import SwapUpperSection from '../components/SwapUpperSection.js';
import AddUpperSection from '../components/AddUpperSection';
import MenuPanelFooter from './MenuPanelFooter.js';
import { useMoralis } from 'react-moralis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MenuPanel = ({ currencies, section }) => {
  const { registry, exchangeCurrent, setExchangeCurrent } = useWeb3();
  const { contract, balance, reserve } = exchangeCurrent ?? {};
  const [loadingRegistry, setLoadingRegistry] = useState(false);
  const [inputToken, setInputToken] = useState([currencies[0], 0]);
  const [outputToken, setOutputToken] = useState([currencies[1], 1]);
  const currentTokenExchangeAddress = useRef(null);
  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleOpenSecond = useCallback(() => setOpenSecond(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const handleCloseSecond = useCallback(() => setOpenSecond(false), []);
  const [inputOne, setInputOne] = useState(null);
  const [inputTwo, setInputTwo] = useState(null);
  const [shareOfPool, setShareOfPool] = useState(null);
  const { authenticate, user } = useMoralis();

  const exchangeHandler = useCallback(() => {
    if (inputToken[1] !== 1) {
      return inputToken[0].address;
    } else {
      return outputToken[0].address;
    }
  }, [inputToken, outputToken]);

  const swapTypeHandler = useCallback(() => {
    if (inputToken[1] !== 1) {
      if (outputToken[1] !== 1) {
        return 'TokenToTokenSwap';
      } else {
        return 'TokenToEthSwap';
      }
    } else {
      return 'EthToTokenSwap';
    }
  }, [inputToken, outputToken]);

  const setExchangeCallback = useCallback(
    async (exchange) => {
      await setExchangeCurrent(exchange);
    },
    [setExchangeCurrent]
  );
  useEffect(() => {
    currentTokenExchangeAddress.current = scammExchangeAddress;
    setLoadingRegistry(true);
  }, []);

  useEffect(() => {
    async function loadExchange(exchangeHandler, setExchangeCallback) {
      const toBeExchange = exchangeHandler();
      if (currentTokenExchangeAddress.current !== toBeExchange) {
        currentTokenExchangeAddress.current = toBeExchange;
        setExchangeCallback(toBeExchange);
      }
      console.log('base exchange loaded');
    }
    loadingRegistry &&
      registry?.address &&
      loadExchange(exchangeHandler, setExchangeCallback);
  }, [
    exchangeHandler,
    registry?.address,
    loadingRegistry,
    setExchangeCallback,
  ]);

  const handleMenuItemClick = async (event, index, menuItem) => {
    if (menuItem === 1) {
      if (index === outputToken[1]) {
        handleMenuItemSwitch(inputToken[1], outputToken[1], menuItem);
      } else {
        setInputToken([currencies[index], index]);
        setInputOne(null);
        setInputTwo(null);
      }
      handleClose();
    } else {
      if (index === inputToken[1]) {
        handleMenuItemSwitch(inputToken[1], outputToken[1], menuItem);
      } else {
        setOutputToken([currencies[index], index]);
        setInputOne(null);
        setInputTwo(null);
      }
      handleCloseSecond();
    }
  };

  const handleMenuItemSwitch = (prevSelected, newSelected, menuItem) => {
    const prevIndex = prevSelected;
    const newIndex = newSelected;
    setInputToken([currencies[newIndex], newIndex]);
    setOutputToken([currencies[prevIndex], prevIndex]);
    if (menuItem === 1) {
      setInputOne(((parseFloat(inputTwo) * 990) / 999).toFixed(17).toString());
      setInputTwo(inputOne);
    } else {
      setInputTwo(((parseFloat(inputOne) * 999) / 990).toFixed(17).toString());
      setInputOne(inputTwo);
    }
  };

  const handleInputChange = (event) => {
    if (event.target.value > 0) {
      if (section === 'swap') {
        callExchange(event.target.value, event.target.id);
      } else {
        callBondingCurve(event.target.value, event.target.id);
      }
    } else if (event.target.value === '') {
      setInputOne(null);
      setInputTwo(null);
    } else if (event.target.value === '00') {
      setInputOne(inputOne);
      setInputTwo(inputTwo);
    } else {
      setInputOne(event.target.value);
      setInputTwo(event.target.value);
    }
  };

  async function callBondingCurve(input, id) {
    if (exchangeCurrent.balance === '0.0') {
      if (id === '1') {
        setInputOne(input);
      } else {
        setInputTwo(input);
      }
      return;
    }
    let intoNumb;
    let inpot;
    let amount;
    amount =
      id === '1' ? (balance * input) / reserve : (reserve * input) / balance;
    console.log('amount', amount);
    if (id === '1') {
      intoNumb = parseInt(reserve);
      setInputOne(input);
      setInputTwo(amount);
    } else {
      intoNumb = parseInt(balance);
      setInputTwo(input);
      setInputOne(amount);
    }
    inpot = parseInt(input);
    setShareOfPool((inpot / (inpot + intoNumb)) * 100);
  }

  const notify = () => toast.success('Swap Successful');

  async function callExchange(input, id) {
    let price = ethers.utils.parseEther(input);

    let amount;
    let callFunction = swapTypeHandler();
    if (callFunction === 'TokenToTokenSwap') {
      amount =
        id === '1'
          ? ethers.utils.formatEther(
              await contract.getTokenToTokenAmount(
                price,
                outputToken[0].address
              )
            )
          : (
              (input * input) /
              ethers.utils.formatEther(
                await contract.getTokenToTokenAmount(
                  price,
                  outputToken[0].address
                )
              )
            ).toString();
    } else if (callFunction === 'TokenToEthSwap') {
      amount =
        id === '1'
          ? ethers.utils.formatEther(await contract.getEthAmount(price))
          : ethers.utils.formatEther(await contract.getTokenAmount(price));
    } else {
      amount =
        id === '1'
          ? ethers.utils.formatEther(await contract.getTokenAmount(price))
          : ethers.utils.formatEther(await contract.getEthAmount(price));
    }

    console.log('amount', amount);
    if (id === '1') {
      setInputOne(input);
      setInputTwo(amount);
    } else {
      setInputOne(amount);
      setInputTwo(input);
    }
  }

  async function operate() {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    console.log('providerrrrr', provider);
    const signer = provider.getSigner();
    let currentExchangeAddress = await toast.promise(
      registry.getExchange(currentTokenExchangeAddress.current),
      {
        pending: 'Promise is pending',
        success: 'Promise resolved 👌',
        error: 'Promise rejected 🤯',
      }
    );
    
console.log(response)
    const tokenUserConnection = new ethers.Contract(
      currentTokenExchangeAddress.current,
      ERC20Token.abi,
      signer
    );
    const exchangeUserConnection = new ethers.Contract(
      currentExchangeAddress,
      Exchange.abi,
      signer
    );

    if (section === 'swap' && swapTypeHandler() === 'EthToTokenSwap') {
      return [exchangeUserConnection];
    }

    const wasApproved = await tokenUserConnection.approve(
      currentExchangeAddress,
      ethers.utils.parseEther(inputOne)
    );
    await wasApproved.wait();
    const allowanceAmount = ethers.utils.formatEther(
      await tokenUserConnection.allowance(
        await signer.getAddress(),
        currentExchangeAddress
      )
    );

    if (allowanceAmount === '0') {
      console.log('no allowance');
      return;
    }

    if (allowanceAmount < inputOne) {
      console.log('not enough allowance');
      return;
    }

    return [exchangeUserConnection, allowanceAmount];
  }

  async function add() {
    const [exchangeUserConnection] = await operate();

    let transaction = await exchangeUserConnection.addLiquidity(
      ethers.utils.parseEther(inputOne.toString()),
      {
        value: ethers.utils.parseEther((inputTwo * 0.98).toString()),
      }
    );
    console.log('transaction', transaction);
    console.log('transaction done!');
  }

  async function swap() {
    const [exchangeUserConnection, allowanceAmount] = await operate();
    const swapType = swapTypeHandler();
    let transaction;
    if (swapType === 'EthToTokenSwap') {
      transaction = await exchangeUserConnection.ethToTokenSwap(
        ethers.utils.parseEther((inputTwo * 0.97).toString()),
        {
          value: ethers.utils.parseEther(inputOne.toString()),
        }
      );
    } else if (swapType === 'TokenToEthSwap') {
      transaction = await exchangeUserConnection.tokenToEthSwap(
        ethers.utils.parseEther(allowanceAmount.toString()),
        ethers.utils.parseEther((inputTwo * 0.98).toString())
      );
    } else {
      let minTokensAmount = ethers.utils.formatEther(
        await contract.getTokenToTokenAmount(
          ethers.utils.parseEther(allowanceAmount.toString()),
          outputToken[0].address
        )
      );
      transaction = await exchangeUserConnection.tokenToTokenSwap(
        ethers.utils.parseEther(allowanceAmount.toString()),
        ethers.utils.parseEther((minTokensAmount * 0.98).toString()),
        outputToken[0].address
      );
    }
    console.log('transaction', transaction);
    console.log('transaction done!');
  }

  return (
    <>
      <div
        className={`${
          section === 'swap'
            ? 'py-5 w-[328px] min-h-[518px]'
            : 'sm:w-[436px] sm:h-[626px]'
        } flex-col relative  bg-white rounded-3xl border shadow-sm shadow-slate-300`}
      >
        {section === 'swap' ? <SwapUpperSection /> : <AddUpperSection />}
        <MenuItemList
          handleOpen={handleOpen}
          handleClose={handleClose}
          currencies={currencies}
          token={inputToken}
          open={open}
          input={inputOne}
          handleInputChange={handleInputChange}
          handleMenuItemClick={handleMenuItemClick}
          key={1}
          menuNumber={1}
          section={section}
          id={'1'}
        />
        {section === 'swap' ? (
          <SwitchIcon
            handleMenuItemClick={handleMenuItemClick}
            outputToken={outputToken}
            callExchange={callExchange}
          />
        ) : (
          <h1 className="text-center font-bold text-lg text-violet-700">+</h1>
        )}
        <MenuItemList
          handleOpen={handleOpenSecond}
          handleClose={handleCloseSecond}
          currencies={currencies}
          token={outputToken}
          open={openSecond}
          input={inputTwo}
          handleInputChange={handleInputChange}
          handleMenuItemClick={handleMenuItemClick}
          key={2}
          menuNumber={2}
          section={section}
          id={'2'}
        />
        <PriceEstimator
          inputOne={inputOne}
          inputTwo={inputTwo}
          inputToken={inputToken}
          outputToken={outputToken}
          section={section}
          exchangeCurrent={exchangeCurrent}
          shareOfPool={shareOfPool}
        />

        <div
          className={` absolute w-full ${
            section === 'swap' ? 'bottom-4 px-4' : 'bottom-6 px-6'
          } `}
        >
          <button
            className={`w-full bg-pink-500 hover:opacity-75 transition-opacity duration-200  text-white font-bold py-3 px-12 rounded-xl shadow-slate-500 shadow-sm active:translate-y-0.1 active:shadow-none active:opacity-90 ${
              user && 'disabled:cursor-not-allowed'
            }`}
            disabled={
              user &&
              (inputOne <= 0 ||
                inputTwo <= 0 ||
                inputOne === '' ||
                inputTwo === '' ||
                inputOne === null ||
                inputTwo === null)
            }
            onClick={() => {
              user ? (section === 'swap' ? swap() : add()) : authenticate();
            }}
          >
            {user
              ? section === 'swap'
                ? 'Swap'
                : 'Add Liquidity'
              : 'Connect Wallet'}
          </button>
        </div>
      </div>
      {exchangeCurrent?.balance === '0.0' && (
        <div className="p-4 mx-4 mt-4 bg-orange-50 border border-orange-300 rounded-3xl">
          <div className="flex">
            <WarningIcon
              sx={{
                fontSize: 24,
                color: '#FFB237',
              }}
            />
            <div className="ml-3">
              <h1 className="text-dexfi-violet font-bold">
                No Liquidity in this pool
              </h1>
              <h1 className="text-dexfi-violet font-medium">
                To be first to add liquidity, set whatever amount you find
                convenient.
              </h1>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
      <button onClick={() => notify()}>click me bitch</button>
      <MenuPanelFooter
        inputOne={inputOne}
        inputTwo={inputTwo}
        inputToken={inputToken}
        outputToken={outputToken}
        section={section}
        balance={balance}
      />
    </>
  );
};

export default MenuPanel;
