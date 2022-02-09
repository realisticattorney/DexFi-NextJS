const { expect } = require('chai');
const { ethers, waffle } = require('hardhat');
const { provider } = waffle;

const amountA = ethers.utils.parseEther('10000');
const amountB = ethers.utils.parseEther('1000');
const amountAFromScammCoinOwnerToEachAddr = ethers.utils.parseEther('2000');
const amountTokenToEthFromEachAddr = ethers.utils.parseEther('1000');
const amountBOfETHFromEachAddr = ethers.utils.parseEther('100');

const main = async () => {
  const Token = await ethers.getContractFactory('ScammCoin');
  [signer, addr1, addr2, addr3, addr4, ...addrs] = await ethers.getSigners();
  token = await Token.deploy(ethers.utils.parseEther('100000'));
  await token.deployed();

  const Exchange = await ethers.getContractFactory('Exchange');
  exchange = await Exchange.deploy(token.address);
  await exchange.deployed();

  //LP (signer)
  await token.approve(exchange.address, amountA);
  await exchange.addLiquidity(amountA, {value: amountB});
  //swapper (addr1)
  await token.transfer(addr1.address, amountAFromScammCoinOwnerToEachAddr);
  console.log(await token.balanceOf(addr1.address));
  await token
    .connect(addr1)
    .approve(exchange.address, amountTokenToEthFromEachAddr);
  await exchange
    .connect(addr1)
    .tokenToEthSwap(
      amountTokenToEthFromEachAddr,
      ethers.utils.parseEther('80')
    );

  console.log(
    'addr1 eth balance',
    ethers.utils.formatEther(await provider.getBalance(addr1.address))
  );
  console.log(
    'LP Tokens totalSupply',
    ethers.utils.formatEther(await exchange.totalSupply())
  );
  console.log(
    'Exchange getReserve',
    ethers.utils.formatEther(await exchange.getReserve())
  );

  //swapper (addr2)
  await token.transfer(addr2.address, amountAFromScammCoinOwnerToEachAddr);
  console.log(await token.balanceOf(addr2.address));
  await token
    .connect(addr2)
    .approve(exchange.address, amountTokenToEthFromEachAddr);
  await exchange
    .connect(addr2)
    .tokenToEthSwap(
      amountTokenToEthFromEachAddr,
      ethers.utils.parseEther('70')
    );

  console.log(
    'addr2 eth balance',
    ethers.utils.formatEther(await provider.getBalance(addr2.address))
  );
  console.log(
    'LP Tokens totalSupply',
    ethers.utils.formatEther(await exchange.totalSupply())
  );
  console.log(
    'Exchange getReserve',
    ethers.utils.formatEther(await exchange.getReserve())
  );

  //swapper (addr1 Eth to Token)
  await exchange.connect(addr1).ethToTokenSwap(ethers.utils.parseEther('80'), {
    value: ethers.utils.parseEther('165.3'),
  });

  console.log(
    'addr1 eth balance',
    ethers.utils.formatEther(await provider.getBalance(addr1.address))
  );
  console.log(
    'LP Tokens totalSupply',
    ethers.utils.formatEther(await exchange.totalSupply())
  );
  console.log(
    'Exchange getReserve',
    ethers.utils.formatEther(await exchange.getReserve())
  );
  console.log(
    'Exchange balance',
    ethers.utils.formatEther(await provider.getBalance(exchange.address))
  );

  ///
  ///
  ///
  ///
  ///
  ///
  ///
  ///
  ///
  ///
  ///
  ///

  //swapper (addr1)
  await token.transfer(addr1.address, amountAFromScammCoinOwnerToEachAddr);
  console.log(await token.balanceOf(addr1.address));
  await token
    .connect(addr1)
    .approve(exchange.address, amountTokenToEthFromEachAddr);
  await exchange
    .connect(addr1)
    .tokenToEthSwap(
      amountTokenToEthFromEachAddr,
      ethers.utils.parseEther('80')
    );

  console.log(
    'addr1 eth balance',
    ethers.utils.formatEther(await provider.getBalance(addr1.address))
  );
  console.log(
    'LP Tokens totalSupply',
    ethers.utils.formatEther(await exchange.totalSupply())
  );
  console.log(
    'Exchange getReserve',
    ethers.utils.formatEther(await exchange.getReserve())
  );

  //swapper (addr2)
  await token.transfer(addr2.address, amountAFromScammCoinOwnerToEachAddr);
  console.log(await token.balanceOf(addr2.address));
  await token
    .connect(addr2)
    .approve(exchange.address, amountTokenToEthFromEachAddr);
  await exchange
    .connect(addr2)
    .tokenToEthSwap(
      amountTokenToEthFromEachAddr,
      ethers.utils.parseEther('70')
    );

  console.log(
    'addr2 eth balance',
    ethers.utils.formatEther(await provider.getBalance(addr2.address))
  );
  console.log(
    'LP Tokens totalSupply',
    ethers.utils.formatEther(await exchange.totalSupply())
  );
  console.log(
    'Exchange getReserve',
    ethers.utils.formatEther(await exchange.getReserve())
  );

  //swapper (addr1 Eth to Token)
  await exchange.connect(addr1).ethToTokenSwap(ethers.utils.parseEther('80'), {
    value: ethers.utils.parseEther('165.3'),
  });

  console.log(
    'addr1 eth balance',
    ethers.utils.formatEther(await provider.getBalance(addr1.address))
  );
  console.log(
    'LP Tokens totalSupply',
    ethers.utils.formatEther(await exchange.totalSupply())
  );
  console.log(
    'Exchange getReserve',
    ethers.utils.formatEther(await exchange.getReserve())
  );
  console.log(
    'Exchange balance',
    ethers.utils.formatEther(await provider.getBalance(exchange.address))
  );

  ///
  ///
  ///
  ///
  ///
  ///
  ///
  ///
  ///
  ///
  ///
  ///

  //swapper (addr1)
  await token.transfer(addr1.address, amountAFromScammCoinOwnerToEachAddr);
  console.log(await token.balanceOf(addr1.address));
  await token
    .connect(addr1)
    .approve(exchange.address, amountTokenToEthFromEachAddr);
  await exchange
    .connect(addr1)
    .tokenToEthSwap(
      amountTokenToEthFromEachAddr,
      ethers.utils.parseEther('80')
    );

  console.log(
    'addr1 eth balance',
    ethers.utils.formatEther(await provider.getBalance(addr1.address))
  );
  console.log(
    'LP Tokens totalSupply',
    ethers.utils.formatEther(await exchange.totalSupply())
  );
  console.log(
    'Exchange getReserve',
    ethers.utils.formatEther(await exchange.getReserve())
  );

  //swapper (addr2)
  await token.transfer(addr2.address, amountAFromScammCoinOwnerToEachAddr);
  console.log(await token.balanceOf(addr2.address));
  await token
    .connect(addr2)
    .approve(exchange.address, amountTokenToEthFromEachAddr);
  await exchange
    .connect(addr2)
    .tokenToEthSwap(
      amountTokenToEthFromEachAddr,
      ethers.utils.parseEther('70')
    );

  console.log(
    'addr2 eth balance',
    ethers.utils.formatEther(await provider.getBalance(addr2.address))
  );
  console.log(
    'LP Tokens totalSupply',
    ethers.utils.formatEther(await exchange.totalSupply())
  );
  console.log(
    'Exchange getReserve',
    ethers.utils.formatEther(await exchange.getReserve())
  );

  //swapper (addr1 Eth to Token)
  await exchange.connect(addr1).ethToTokenSwap(ethers.utils.parseEther('80'), {
    value: ethers.utils.parseEther('165.3'),
  });

  console.log(
    'addr1 eth balance',
    ethers.utils.formatEther(await provider.getBalance(addr1.address))
  );
  console.log(
    'LP Tokens totalSupply',
    ethers.utils.formatEther(await exchange.totalSupply())
  );
  console.log(
    'Exchange getReserve',
    ethers.utils.formatEther(await exchange.getReserve())
  );
  console.log(
    'Exchange balance',
    ethers.utils.formatEther(await provider.getBalance(exchange.address))
  );

  ///
  ///
  ///
  ///
  ///
  ///
  ///
  ///
  ///
  ///
  ///
  ///

  //swapper (addr1)
  await token.transfer(addr1.address, amountAFromScammCoinOwnerToEachAddr);
  console.log(await token.balanceOf(addr1.address));
  await token
    .connect(addr1)
    .approve(exchange.address, amountTokenToEthFromEachAddr);
  await exchange
    .connect(addr1)
    .tokenToEthSwap(
      amountTokenToEthFromEachAddr,
      ethers.utils.parseEther('80')
    );

  console.log(
    'addr1 eth balance',
    ethers.utils.formatEther(await provider.getBalance(addr1.address))
  );
  console.log(
    'LP Tokens totalSupply',
    ethers.utils.formatEther(await exchange.totalSupply())
  );
  console.log(
    'Exchange getReserve',
    ethers.utils.formatEther(await exchange.getReserve())
  );

  //swapper (addr2)
  await token.transfer(addr2.address, amountAFromScammCoinOwnerToEachAddr);
  console.log(await token.balanceOf(addr2.address));
  await token
    .connect(addr2)
    .approve(exchange.address, amountTokenToEthFromEachAddr);
  await exchange
    .connect(addr2)
    .tokenToEthSwap(
      amountTokenToEthFromEachAddr,
      ethers.utils.parseEther('70')
    );

  console.log(
    'addr2 eth balance',
    ethers.utils.formatEther(await provider.getBalance(addr2.address))
  );
  console.log(
    'LP Tokens totalSupply',
    ethers.utils.formatEther(await exchange.totalSupply())
  );
  console.log(
    'Exchange getReserve',
    ethers.utils.formatEther(await exchange.getReserve())
  );

  //swapper (addr1 Eth to Token)
  await exchange.connect(addr1).ethToTokenSwap(ethers.utils.parseEther('80'), {
    value: ethers.utils.parseEther('165.3'),
  });

  console.log(
    'addr1 eth balance',
    ethers.utils.formatEther(await provider.getBalance(addr1.address))
  );
  console.log(
    'LP Tokens totalSupply',
    ethers.utils.formatEther(await exchange.totalSupply())
  );
  console.log(
    'Exchange getReserve',
    ethers.utils.formatEther(await exchange.getReserve())
  );
  console.log(
    'Exchange balance',
    ethers.utils.formatEther(await provider.getBalance(exchange.address))
  );
  console.log(
    'Signer ETH before Taking Profits',
    await provider.getBalance(signer.address)
  );
  console.log(
    'Signer ScammCoins before taking profits',
    await token.balanceOf(signer.address)
  );
  await exchange.removeLiquidity(ethers.utils.parseEther('1000'));
  // await exchange.connect(addr1).removeLiquidity(ethers.utils.parseEther('0.394314890191437766'));
  console.log(
    'Signer ETH AFTER Taking Profits',
    await provider.getBalance(signer.address)
  );
  console.log(
    'Signer ScammCoins AFTER taking profits',
    await token.balanceOf(signer.address)
  );
  console.log(
    'LP Tokens totalSupply AFETR taking profits',
    ethers.utils.formatEther(await exchange.totalSupply())
  );
  console.log(
    'Exchange getReserve after taking profits',
    ethers.utils.formatEther(await exchange.getReserve())
  );
  console.log(
    'Exchange balance after taking profits',
    ethers.utils.formatEther(await provider.getBalance(exchange.address))
  );

  console.log('lalalalalalalala');
  console.log(
    ethers.utils.formatEther(await exchange.balanceOf(addr1.address))
  );
  console.log(
    ethers.utils.formatEther(await exchange.balanceOf(addr2.address))
  );
};


const runMain = async () => {
   try {
     await main();
     process.exit(0);
   } catch (error) {
     console.log(error);
     process.exit(1);
   }
 };
 
 runMain();
 