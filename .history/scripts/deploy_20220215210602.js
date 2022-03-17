const { ethers, waffle } = require('hardhat');
const { provider } = waffle;
const amountA = ethers.utils.parseEther('10000');
const amountB = ethers.utils.parseEther('1000');
const amountB = ethers.utils.parseEther('1000');


async function main() {
  const Registry = await ethers.getContractFactory('Registry');
  const registry = await Registry.deploy(); //do not define registry as const, it won't make it outside the beforeEach function scope
  await registry.deployed();

  const [deployer] = await ethers.getSigners();

  const Token = await ethers.getContractFactory('ScammCoin');
  const token = await Token.deploy(ethers.utils.parseEther('100000'));
  await token.deployed();

  const Exchange = await ethers.getContractFactory('Exchange');
  // exchange = await Exchange.deploy(token.address);
  // await exchange.deployed();

  const TokenTwo = await ethers.getContractFactory('USDC');
  const tokenTwo = await TokenTwo.deploy(ethers.utils.parseEther('100000'));
  await tokenTwo.deployed();

  console.log('Deployer address:', deployer.address);
  console.log('Registry contract address:', registry.address);
  console.log('ScammCoin contract address:', token.address);
  console.log('USDC contract address:', tokenTwo.address);

  let scammExchange = await registry.createExchange(token.address);
  let txReceipt = await scammExchange.wait();
  const [, scammExchangeAddress] = txReceipt.events[0].args;
  console.log('Receipt ScammCoinExchangeAddress:', scammExchangeAddress);
  const getScammExchangeAddress = await registry.getExchange(token.address);

  let USDCExchange = await registry.createExchange(tokenTwo.address);
  let txReceiptTwo = await USDCExchange.wait();
  const [, USDCExchangeAddress] = txReceiptTwo.events[0].args;
  console.log('Receipt USDCExchangeAddress:', USDCExchangeAddress);
  const getUSDCExchangeAddress = await registry.getExchange(tokenTwo.address);

  // exchangeTwo = await Exchange.deploy(tokenTwo.address);
  // await exchangeTwo.deployed();

  // console.log('Mapping of ScammExchange contract address:', exchange.address);
  // console.log('Mapping of USDCExchange contract address:', exchangeTwo.address);
  console.log(
    'Mapping of ScammExchange contract address:',
    getScammExchangeAddress
  );
  console.log(
    'Mapping of USDCExchange contract address:',
    getUSDCExchangeAddress
  );

  const scammExchangeContract = await Exchange.attach(scammExchangeAddress);
  const USDCExchangeContract = await Exchange.attach(USDCExchangeAddress);

  await token.approve(scammExchangeContract.address, amountA);
  const allowanceAmount = ethers.utils.formatEther(
    await token.allowance(deployer.address, scammExchangeContract.address)
  );
  console.log('AllowedScammCoinsToTranfer', allowanceAmount);
  await scammExchangeContract.addLiquidity(amountA, { value: amountB });
  const ethProvided = ethers.utils.formatEther(
    await provider.getBalance(scammExchangeContract.address)
  );
  console.log('EthProvidedToScammExchange', ethProvided);

  await tokenTwo.approve(USDCExchangeContract.address, amountA);
  const allowanceAmountTwo = ethers.utils.formatEther(
    await tokenTwo.allowance(deployer.address, USDCExchangeContract.address)
  );
  console.log('AllowedUSDCToTranfer', allowanceAmountTwo);
  await USDCExchangeContract.addLiquidity(amountA, { value: amountB });
  const ethProvidedTwo = ethers.utils.formatEther(
    await provider.getBalance(USDCExchangeContract.address)
  );
  console.log('EthProvidedToUSDCExchange', ethProvidedTwo);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// We also save the contract's artifacts and address in the frontend directory
//   saveFrontendFiles(token);
// }

// function saveFrontendFiles(token) {
//   const fs = require('fs');
//   const contractsDir = __dirname + '/../frontend/src/contracts';

//   if (!fs.existsSync(contractsDir)) {
//     fs.mkdirSync(contractsDir);
//   }

//   fs.writeFileSync(
//     contractsDir + '/contract-address.json',
//     JSON.stringify({ Token: token.address }, undefined, 2)
//   );

//   const TokenArtifact = artifacts.readArtifactSync('Token');

//   fs.writeFileSync(
//     contractsDir + '/Token.json',
//     JSON.stringify(TokenArtifact, null, 2)
//   );
