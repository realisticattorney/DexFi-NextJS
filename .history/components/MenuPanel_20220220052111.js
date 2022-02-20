import { ethers } from 'ethers';
import { useState, useEffect, useRef, useCallback } from 'react'; //hooks
import Web3Modal from 'web3modal';
import MenuItemList from './MenuItemList.js';
import { useWeb3 } from './providers/web3';
import { scammExchangeAddress } from '../config.js';
import Exchange from '../artifacts/contracts/Exchange.sol/Exchange.json';
import ERC20Token from '../artifacts/contracts/ERC20Token.sol/ERC20Token.json';
import SwitchIcon from './SwitchIcon.js';
import PriceEstimator from './PriceEstimator.js';

const MenuPanel = ({ currencies, section }) => {
  const {
    provider,
    registry,
    exchange2,
    web3,
    isUserWalletConnected,
    connect,
  } = useWeb3();


  const [exchange, setExchange] = useState(exchange2);
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

  const handleInputToken = useCallback((current) => {
    setInputToken([current[0], current[1]]);
  }, []);

  const handleOutputToken = useCallback((current) => {
    setOutputToken([current[0], current[1]]);
  }, []);

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

  const setExchangeCallback = useCallback((exchange) => {
    setExchange(exchange);
  }, []);

  console.log('render');
  useEffect(() => {
    currentTokenExchangeAddress.current = scammExchangeAddress;
    setLoadingRegistry(true);
  }, []);

  useEffect(() => {
    if (loadingRegistry === false) {
      return;
    }
    async function loadExchange(
      exchangeHandler,
      registry,
      setExchangeCallback
    ) {
      const toBeExchange = exchangeHandler();

      if (currentTokenExchangeAddress.current !== toBeExchange) {
        currentTokenExchangeAddress.current = toBeExchange;
        let newExchangeAddress = await registry.getExchange(toBeExchange);
        setExchangeCallback(
          new ethers.Contract(newExchangeAddress, Exchange.abi, provider)
        );
      }
      console.log('base exchange loaded');
    }
    loadExchange(exchangeHandler, registry, setExchangeCallback);
  }, [
    exchangeHandler,
    registry,
    provider,
    loadingRegistry,
    setExchangeCallback,
  ]);

  const handleMenuItemClick = async (event, index, menuItem) => {
    if (menuItem === 1) {
      if (index === outputToken[1]) {
        handleMenuItemSwitch(inputToken[1], outputToken[1]);
      } else {
        handleInputToken([currencies[index], index]);
        setInputOne(null);
        setInputTwo(null);
      }
      handleClose();
    } else {
      if (index === inputToken[1]) {
        handleMenuItemSwitch(inputToken[1], outputToken[1]);
      } else {
        handleOutputToken([currencies[index], index]);
        setInputOne(null);
        setInputTwo(null);
      }
      handleCloseSecond();
    }
  };

  const handleMenuItemSwitch = (prevSelected, newSelected) => {
    const prevIndex = prevSelected;
    const newIndex = newSelected;
    handleInputToken([currencies[newIndex], newIndex]);
    handleOutputToken([currencies[prevIndex], prevIndex]);
    setInputOne(inputTwo);
    setInputTwo(inputOne);
  };

  const handleInputOneChange = (event) => {
    event.preventDefault();
    console.log('evento', event.target.value);
    console.log('evento target', event.target.id);
    if (event.target.value > 0) {
      if(section === "swap") {
      callExchange(event.target.value, event.target.id); 
    } else {
      callBondingCurve()
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

  async function callExchange(input, id) {
    let price = await ethers.utils.parseEther(input);
    let amount;
    let callFunction = swapTypeHandler();
    if (callFunction === 'TokenToTokenSwap') {
      amount =
        id === 'outlined-number-1'
          ? ethers.utils.formatEther(
              await exchange.getTokenToTokenAmount(
                price,
                outputToken[0].address
              )
            )
          : (
              (input * input) /
              ethers.utils.formatEther(
                await exchange.getTokenToTokenAmount(
                  price,
                  outputToken[0].address
                )
              )
            ).toString();
    } else if (callFunction === 'TokenToEthSwap') {
      amount =
        id === 'outlined-number-1'
          ? ethers.utils.formatEther(await exchange.getEthAmount(price))
          : ethers.utils.formatEther(await exchange.getTokenAmount(price));
    } else {
      amount =
        id === 'outlined-number-1'
          ? ethers.utils.formatEther(await exchange.getTokenAmount(price))
          : ethers.utils.formatEther(await exchange.getEthAmount(price));
    }

    console.log('amount', amount);
    if (id === 'outlined-number-1') {
      setInputOne(input);
      setInputTwo(amount);
    } else {
      setInputOne(amount);
      setInputTwo(input);
    }
  }

  async function add() {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    let currentExchangeAddress = await registry.getExchange(
      currentTokenExchangeAddress.current
    );
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
  }

  async function swap() {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    let currentExchangeAddress = await registry.getExchange(
      currentTokenExchangeAddress.current
    );
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
    const swapType = swapTypeHandler();

    if (swapType === 'EthToTokenSwap') {
      let transaction = await exchangeUserConnection.ethToTokenSwap(
        ethers.utils.parseEther((inputTwo * 0.98).toString()),
        {
          value: ethers.utils.parseEther(inputOne.toString()),
        }
      );
      console.log('transaction', transaction);
      console.log('transaction done!');
      return;
    }

    const wasApproved = await tokenUserConnection.approve(
      currentExchangeAddress,
      ethers.utils.parseEther(inputOne)
    );
    console.log('not yet confirmed');
    let waitDude = await wasApproved.wait();
    console.log('waitdudeee', waitDude);
    console.log('was approved?', wasApproved);
    const allowanceAmount = ethers.utils.formatEther(
      await tokenUserConnection.allowance(
        await signer.getAddress(),
        currentExchangeAddress
      )
    );

    console.log('allowanceAmount', allowanceAmount);

    if (allowanceAmount === '0') {
      console.log('no allowance');
      return;
    }

    if (allowanceAmount < inputOne) {
      console.log('not enough allowance');
      return;
    }

    if (swapType === 'TokenToEthSwap') {
      let transaction = await exchangeUserConnection.tokenToEthSwap(
        ethers.utils.parseEther(allowanceAmount.toString()),
        ethers.utils.parseEther((inputTwo * 0.98).toString())
      );
      console.log('transaction', transaction);
    } else {
      let minTokensAmount = ethers.utils.formatEther(
        await exchange.getTokenToTokenAmount(
          ethers.utils.parseEther(allowanceAmount.toString()),
          outputToken[0].address
        )
      );
      console.log('minTokensAmount', minTokensAmount);
      console.log('mintype', typeof minTokensAmount);
      let transaction = await exchangeUserConnection.tokenToTokenSwap(
        ethers.utils.parseEther(allowanceAmount.toString()),
        ethers.utils.parseEther((minTokensAmount * 0.98).toString()),
        outputToken[0].address
      );
      console.log('transaction', transaction);
    }
    console.log('transaction done!');
  }

  return (
    <>
      <MenuItemList
        handleOpen={handleOpen}
        handleClose={handleClose}
        currencies={currencies}
        token={inputToken}
        open={open}
        input={inputOne}
        handleInputChange={handleInputOneChange}
        handleMenuItemClick={handleMenuItemClick}
        key={1}
        menuNumber={1}
        section={section}
        id={'outlined-number-1'}
      />
      {section === "swap" ? (
      <SwitchIcon
        handleMenuItemClick={handleMenuItemClick}
        outputToken={outputToken}
      />
      ) : (
        <h1 className='text-center font-bold text-lg text-violet-700'>+</h1>
      )}
      <MenuItemList
        handleOpen={handleOpenSecond}
        handleClose={handleCloseSecond}
        currencies={currencies}
        token={outputToken}
        open={openSecond}
        input={inputTwo}
        handleInputChange={handleInputOneChange}
        handleMenuItemClick={handleMenuItemClick}
        key={2}
        menuNumber={2}
        section={section}
        id={'outlined-number-2'}
      />
      <PriceEstimator
        inputOne={inputOne}
        inputTwo={inputTwo}
        inputToken={inputToken}
        outputToken={outputToken}
      />
     
      <div className="px-4 absolute w-full bottom-4">
        <button
          className="w-full bg-pink-500 shadow-sm text-white font-bold py-3 px-12 rounded-xl"
          onClick={() => {
            isUserWalletConnected ? section === "swap" ? swap() : add() : connect(exchange.address);
          }}
        >
          {isUserWalletConnected ? section === "swap" ? "Swap" : "Add Liquidity" : 'Connect Wallet'}
        </button>
      </div>
    </>
  );
};

export default MenuPanel;
