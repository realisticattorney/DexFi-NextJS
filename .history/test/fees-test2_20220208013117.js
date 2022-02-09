// const { expect } = require('chai');
// const { ethers, waffle } = require('hardhat');
// const { provider } = waffle;

// const amountA = ethers.utils.parseEther('10000');
// const amountB = ethers.utils.parseEther('1000');
// const amountC = ethers.utils.parseEther('900');
// const amountAFromScammCoinOwnerToEachAddr = ethers.utils.parseEther('20000');
// const amountTokenToEthFromEachAddr = ethers.utils.parseEther('981.6');
// const amountBO = ethers.utils.parseEther('100');

// describe('Exchange NoRefs', function () {
//   beforeEach(async function () {
//     const Token = await ethers.getContractFactory('ScammCoin');
//     [signer, addr1, addr2, addr3, addr4, ...addrs] = await ethers.getSigners();
//     token = await Token.deploy(ethers.utils.parseEther('1000000'));
//     await token.deployed();

//     const Exchange = await ethers.getContractFactory('ExchangeNoRefs');
//     exchange = await Exchange.deploy(token.address);
//     await exchange.deployed();
//   });

//   it('Adds liquidity', async function () {
//     await token.approve(exchange.address, amountA);
//     const allowanceAmount = ethers.utils.formatEther(
//       await token.allowance(signer.address, exchange.address)
//     );
//     console.log('AllowedScammCoinsToTranfer', allowanceAmount);
//     await exchange.addLiquidity(amountA, { value: amountB });
//     const ethProvided = ethers.utils.formatEther(
//       await provider.getBalance(exchange.address)
//     );
//     console.log('AllowedEthToTranfer: ' + ethProvided);
//     expect(await provider.getBalance(exchange.address)).to.equal(amountB);
//     expect(await exchange.getReserve()).to.equal(amountA);
//   });

//   it('Returns the correct amount of Ether', async function () {
//     await token.approve(exchange.address, amountA);
//     await exchange.addLiquidity(amountA, { value: amountB });
//     console.log(
//       'TokensAddedToPool',
//       ethers.utils.formatEther(await exchange.getReserve())
//     );
//     console.log(
//       'EtherAddedToBalance',
//       ethers.utils.formatEther(await provider.getBalance(exchange.address))
//     );
//     expect(
//       ethers.utils.formatEther(
//         await exchange.getEthAmount(ethers.utils.parseEther('10'))
//       )
//     ).to.equal('0.989020869339354039');
//   });

//   it('Checks amount of LP tokens from LP', async function () {
//     await token.approve(exchange.address, amountA);
//     await exchange.addLiquidity(amountA, {
//       value: amountB,
//     });
//     const mintedLPTokens = await exchange.totalSupply();
//     expect(mintedLPTokens.toString()).to.equal('1000000000000000000000'); //1000 ETH
//   });

//   it('Swaps Eth for ScammCoin', async function () {
//     //LP (signer)
//     await token.approve(exchange.address, amountA);
//     await exchange.addLiquidity(amountA, {
//       value: amountB,
//     });
//     //Liquidity Provider (addr1)
//     await token.transfer(addr1.address, amountA);
//     console.log(await token.balanceOf(addr1.address));
//     await token.connect(addr1).approve(exchange.address, amountA);
//     const allowanceAmount = ethers.utils.formatEther(
//       await token.allowance(addr1.address, exchange.address)
//     );
//     console.log('AllowedScammCoinsToTranfer', allowanceAmount);
//     await exchange.connect(addr1).addLiquidity(amountA, {
//       value: amountB, //1000eth
//     });

//     console.log(
//       'addr1 eth balance',
//       ethers.utils.formatEther(await provider.getBalance(addr1.address))
//     );
//     console.log(
//       'LP Tokens totalSupply',
//       ethers.utils.formatEther(await exchange.totalSupply())
//     );
//     console.log(
//       'Exchange getReserve',
//       ethers.utils.formatEther(await exchange.getReserve())
//     );
//         console.log(
//       'Exchange balance',
//       ethers.utils.formatEther(await provider.getBalance(exchange.address))
//     );

//     //swapper (addr2)
//     await token.transfer(addr2.address, amountAFromScammCoinOwnerToEachAddr);
//     console.log(await token.balanceOf(addr2.address));
//     await token
//       .connect(addr2)
//       .approve(exchange.address, amountTokenToEthFromEachAddr);
//       console.log(
//         'AMOUNT GOTTEN FROM tokenToEthSwap 1',
//         ethers.utils.formatEther(
//           await exchange.connect(addr2).getEthAmount(amountTokenToEthFromEachAddr)
//         )
//       );
//     await exchange
//       .connect(addr2)
//       .tokenToEthSwap(
//         amountTokenToEthFromEachAddr,
//         ethers.utils.parseEther('70')
//       );

//     console.log(
//       'addr2 eth balance',
//       ethers.utils.formatEther(await provider.getBalance(addr2.address))
//     );
//     console.log(
//       'LP Tokens totalSupply',
//       ethers.utils.formatEther(await exchange.totalSupply())
//     );
//     console.log(
//       'Exchange getReserve',
//       ethers.utils.formatEther(await exchange.getReserve())
//     );
//         console.log(
//       'Exchange balance',
//       ethers.utils.formatEther(await provider.getBalance(exchange.address))
//     );

//     //swapper (addr1 Eth to Token)
//     await exchange
//       .connect(addr1)
//       .ethToTokenSwap(ethers.utils.parseEther('80'), {
//         value: ethers.utils.parseEther('165.3'),
//       });

//     console.log(
//       'addr1 eth balance',
//       ethers.utils.formatEther(await provider.getBalance(addr1.address))
//     );
//     console.log(
//       'LP Tokens totalSupply',
//       ethers.utils.formatEther(await exchange.totalSupply())
//     );
//     console.log(
//       'Exchange getReserve',
//       ethers.utils.formatEther(await exchange.getReserve())
//     );
//         console.log(
//       'Exchange balance',
//       ethers.utils.formatEther(await provider.getBalance(exchange.address))
//     );
//     console.log(
//       'Exchange balance',
//       ethers.utils.formatEther(await provider.getBalance(exchange.address))
//     );

//     ///
//     ///
//     ///
//     ///
//     ///
//     ///
//     ///
//     ///
//     ///
//     ///
//     ///
//     ///

//     //swapper (addr1)
//     await token.transfer(addr1.address, amountAFromScammCoinOwnerToEachAddr);
//     console.log(await token.balanceOf(addr1.address));
//     await token
//       .connect(addr1)
//       .approve(exchange.address, amountTokenToEthFromEachAddr);
//       console.log(
//         'AMOUNT GOTTEN FROM tokenToEthSwap 2',
//         ethers.utils.formatEther(
//           await exchange.connect(addr1).getEthAmount(amountTokenToEthFromEachAddr)
//         )
//       );
//     await exchange
//       .connect(addr1)
//       .tokenToEthSwap(
//         amountTokenToEthFromEachAddr,
//         ethers.utils.parseEther('80')
//       );

//     console.log(
//       'addr1 eth balance',
//       ethers.utils.formatEther(await provider.getBalance(addr1.address))
//     );
//     console.log(
//       'LP Tokens totalSupply',
//       ethers.utils.formatEther(await exchange.totalSupply())
//     );
//     console.log(
//       'Exchange getReserve',
//       ethers.utils.formatEther(await exchange.getReserve())
//     );
//         console.log(
//       'Exchange balance',
//       ethers.utils.formatEther(await provider.getBalance(exchange.address))
//     );

//     //swapper (addr2)
//     await token.transfer(addr2.address, amountAFromScammCoinOwnerToEachAddr);
//     console.log(await token.balanceOf(addr2.address));
//     await token
//       .connect(addr2)
//       .approve(exchange.address, amountTokenToEthFromEachAddr);
//       console.log(
//         'AMOUNT GOTTEN FROM tokenToEthSwap 3',
//         ethers.utils.formatEther(
//           await exchange.connect(addr2).getEthAmount(amountTokenToEthFromEachAddr)
//         )
//       );
//     await exchange
//       .connect(addr2)
//       .tokenToEthSwap(
//         amountTokenToEthFromEachAddr,
//         ethers.utils.parseEther('70')
//       );

//     console.log(
//       'addr2 eth balance',
//       ethers.utils.formatEther(await provider.getBalance(addr2.address))
//     );
//     console.log(
//       'LP Tokens totalSupply',
//       ethers.utils.formatEther(await exchange.totalSupply())
//     );
//     console.log(
//       'Exchange getReserve',
//       ethers.utils.formatEther(await exchange.getReserve())
//     );
//         console.log(
//       'Exchange balance',
//       ethers.utils.formatEther(await provider.getBalance(exchange.address))
//     );

//     //swapper (addr1 Eth to Token)
//     await exchange
//       .connect(addr1)
//       .ethToTokenSwap(ethers.utils.parseEther('80'), {
//         value: ethers.utils.parseEther('165.3'),
//       });

//     console.log(
//       'addr1 eth balance',
//       ethers.utils.formatEther(await provider.getBalance(addr1.address))
//     );
//     console.log(
//       'LP Tokens totalSupply',
//       ethers.utils.formatEther(await exchange.totalSupply())
//     );
//     console.log(
//       'Exchange getReserve',
//       ethers.utils.formatEther(await exchange.getReserve())
//     );
//         console.log(
//       'Exchange balance',
//       ethers.utils.formatEther(await provider.getBalance(exchange.address))
//     );
//     console.log(
//       'Exchange balance',
//       ethers.utils.formatEther(await provider.getBalance(exchange.address))
//     );

//     //swapper (addr1)
//     await token.transfer(addr1.address, amountAFromScammCoinOwnerToEachAddr);
//     console.log(await token.balanceOf(addr1.address));
//     await token
//       .connect(addr1)
//       .approve(exchange.address, amountTokenToEthFromEachAddr);
//     console.log(
//       'AMOUNT GOTTEN FROM tokenToEthSwap 4',
//       ethers.utils.formatEther(
//         await exchange.connect(addr1).getEthAmount(amountTokenToEthFromEachAddr)
//       )
//     );
//     await exchange
//       .connect(addr1)
//       .tokenToEthSwap(
//         amountTokenToEthFromEachAddr,
//         ethers.utils.parseEther('80')
//       );

//     console.log(
//       'addr1 eth balance',
//       ethers.utils.formatEther(await provider.getBalance(addr1.address))
//     );
//     console.log(
//       'LP Tokens totalSupply',
//       ethers.utils.formatEther(await exchange.totalSupply())
//     );
//     console.log(
//       'Exchange getReserve',
//       ethers.utils.formatEther(await exchange.getReserve())
//     );
//         console.log(
//       'Exchange balance',
//       ethers.utils.formatEther(await provider.getBalance(exchange.address))
//     );

//     //swapper (addr2)
//     await token.transfer(addr2.address, amountAFromScammCoinOwnerToEachAddr);
//     console.log(await token.balanceOf(addr2.address));
//     await token
//       .connect(addr2)
//       .approve(exchange.address, amountTokenToEthFromEachAddr);
//     console.log(
//       'AMOUNT GOTTEN FROM tokenToEthSwap 5',
//       ethers.utils.formatEther(
//         await exchange.connect(addr2).getEthAmount(amountTokenToEthFromEachAddr)
//       )
//     );
//     await exchange
//       .connect(addr2)
//       .tokenToEthSwap(
//         amountTokenToEthFromEachAddr,
//         ethers.utils.parseEther('70')
//       );

//     console.log(
//       'addr2 eth balance',
//       ethers.utils.formatEther(await provider.getBalance(addr2.address))
//     );
//     console.log(
//       'LP Tokens totalSupply',
//       ethers.utils.formatEther(await exchange.totalSupply())
//     );
//     console.log(
//       'Exchange getReserve',
//       ethers.utils.formatEther(await exchange.getReserve())
//     );
//         console.log(
//       'Exchange balance',
//       ethers.utils.formatEther(await provider.getBalance(exchange.address))
//     );

//     //swapper (addr1 Eth to Token)
//     await exchange
//       .connect(addr1)
//       .ethToTokenSwap(ethers.utils.parseEther('80'), {
//         value: ethers.utils.parseEther('165.3'),
//       });

//     console.log(
//       'addr1 eth balance',
//       ethers.utils.formatEther(await provider.getBalance(addr1.address))
//     );
//     console.log(
//       'LP Tokens totalSupply',
//       ethers.utils.formatEther(await exchange.totalSupply())
//     );
//     console.log(
//       'Exchange getReserve',
//       ethers.utils.formatEther(await exchange.getReserve())
//     );
//         console.log(
//       'Exchange balance',
//       ethers.utils.formatEther(await provider.getBalance(exchange.address))
//     );
//     console.log(
//       'Exchange balance',
//       ethers.utils.formatEther(await provider.getBalance(exchange.address))
//     );

//     // ///
//     // ///
//     // ///
//     // ///
//     // ///
//     // ///
//     // ///
//     // ///
//     // ///
//     // ///
//     // ///
//     // ///

//     //swapper (addr1)
//     await token.transfer(addr1.address, amountAFromScammCoinOwnerToEachAddr);
//     console.log(await token.balanceOf(addr1.address));
//     await token
//       .connect(addr1)
//       .approve(exchange.address, amountTokenToEthFromEachAddr);
//     console.log(
//       'AMOUNT GOTTEN FROM tokenToEthSwap 6',
//       ethers.utils.formatEther(
//         await exchange.connect(addr1).getEthAmount(amountTokenToEthFromEachAddr)
//       )
//     );
//     await exchange
//       .connect(addr1)
//       .tokenToEthSwap(
//         amountTokenToEthFromEachAddr,
//         ethers.utils.parseEther('80')
//       );

//     console.log(
//       'addr1 eth balance',
//       ethers.utils.formatEther(await provider.getBalance(addr1.address))
//     );
//     console.log(
//       'LP Tokens totalSupply',
//       ethers.utils.formatEther(await exchange.totalSupply())
//     );
//     console.log(
//       'Exchange getReserve',
//       ethers.utils.formatEther(await exchange.getReserve())
//     );
//         console.log(
//       'Exchange balance',
//       ethers.utils.formatEther(await provider.getBalance(exchange.address))
//     );

//     //swapper (addr2)
//     await token.transfer(addr2.address, amountAFromScammCoinOwnerToEachAddr);
//     console.log(await token.balanceOf(addr2.address));
//     await token
//       .connect(addr2)
//       .approve(exchange.address, amountTokenToEthFromEachAddr);
//       console.log(
//         'AMOUNT GOTTEN FROM tokenToEthSwap 7',
//         ethers.utils.formatEther(
//           await exchange.connect(addr2).getEthAmount(amountTokenToEthFromEachAddr)
//         )
//       );
//     await exchange
//       .connect(addr2)
//       .tokenToEthSwap(
//         amountTokenToEthFromEachAddr,
//         ethers.utils.parseEther('70')
//       );

//     console.log(
//       'addr2 eth balance',
//       ethers.utils.formatEther(await provider.getBalance(addr2.address))
//     );
//     console.log(
//       'LP Tokens totalSupply',
//       ethers.utils.formatEther(await exchange.totalSupply())
//     );
//     console.log(
//       'Exchange getReserve',
//       ethers.utils.formatEther(await exchange.getReserve())
//     );
//         console.log(
//       'Exchange balance',
//       ethers.utils.formatEther(await provider.getBalance(exchange.address))
//     );

//     //swapper (addr1 Eth to Token)
//     await exchange
//       .connect(addr1)
//       .ethToTokenSwap(ethers.utils.parseEther('80'), {
//         value: ethers.utils.parseEther('165.3'),
//       });

//     console.log(
//       'addr1 eth balance',
//       ethers.utils.formatEther(await provider.getBalance(addr1.address))
//     );
//     console.log(
//       'LP Tokens totalSupply',
//       ethers.utils.formatEther(await exchange.totalSupply())
//     );
//     console.log(
//       'Exchange getReserve',
//       ethers.utils.formatEther(await exchange.getReserve())
//     );
//         console.log(
//       'Exchange balance',
//       ethers.utils.formatEther(await provider.getBalance(exchange.address))
//     );
//     console.log(
//       'Exchange balance',
//       ethers.utils.formatEther(await provider.getBalance(exchange.address))
//     );
//     console.log(
//       'Signer ETH before Taking Profits',
//       await ethers.utils.formatEther(await provider.getBalance(signer.address))
//     );
//     console.log(
//       'Signer ScammCoins before taking profits',
//       await ethers.utils.formatEther(await token.balanceOf(signer.address))
//     );
//     await exchange.removeLiquidity(ethers.utils.parseEther('1000'));
//     // await exchange.connect(signer).removeLiquidity(ethers.utils.parseEther('0.394314890191437766'));
//     console.log(
//       'Signer ETH AFTER Taking Profits',
//       await ethers.utils.formatEther(await provider.getBalance(signer.address))
//     );
//     console.log(
//       'Signer ScammCoins AFTER taking profits',
//       await ethers.utils.formatEther(await token.balanceOf(signer.address))
//     );
//     console.log(
//       'LP Tokens totalSupply AFETR taking profits',
//       ethers.utils.formatEther(await exchange.totalSupply())
//     );
//     console.log(
//       'Exchange getReserve after taking profits',
//       ethers.utils.formatEther(await exchange.getReserve())
//     );
//     console.log(
//       'Exchange balance after taking profits',
//       ethers.utils.formatEther(await provider.getBalance(exchange.address))
//     );

//     console.log('lalalalalalalala');
//     console.log(
//       ethers.utils.formatEther(await exchange.balanceOf(addr1.address))
//     );
//     console.log(
//       ethers.utils.formatEther(await exchange.balanceOf(signer.address))
//     );
//   });
// });
