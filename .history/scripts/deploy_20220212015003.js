const { ethers, waffle } = require('hardhat');
const { provider } = waffle;
const amountA = ethers.utils.parseEther('10000');
const amountB = ethers.utils.parseEther('1000');

async function main() {
  const Registry = await ethers.getContractFactory('Registry');
  const registry = await Registry.deploy(); //do not define registry as const, it won't make it outside the beforeEach function scope
  await registry.deployed();

  const [deployer] = await ethers.getSigners();

  const Token = await ethers.getContractFactory('ScammCoin');
  const token = await Token.deploy(ethers.utils.parseEther('10000'));
  await token.deployed();

  console.log('Deployer address:', deployer.address);
  console.log('Registry contract address:', registry.address);
  console.log('ScammCoin contract address:', token.address);

  // let scammExchange = await registry.createExchange(token.address);
  // let txReceipt = await scammExchange.wait();
  // const [, exchangeAddress] = txReceipt.events[0].args;
  // console.log('Receipt:', exchangeAddress);
  // const getExchangeAddress = await registry.getExchange(token.address);
  const Exchange = await ethers.getContractFactory('Exchange');
  exchange = await Exchange.deploy(token.address);
  await exchange.deployed();
  console.log('Mapping of ScammExchange contract address:', exchange.address);
  // console.log('Mapping of ScammExchange contract address:', getExchangeAddress);
  await token.approve(exchange.address, amountA);
  const allowanceAmount = ethers.utils.formatEther(
    await token.allowance(deployer.address, exchange.address)
  );
  console.log('AllowedScammCoinsToTranfer', allowanceAmount);
  await exchange.addLiquidity(amountA, { value: amountB });
  const ethProvided = ethers.utils.formatEther(
    await provider.getBalance(exchange.address)
  );
  console.log('EthProvided', ethProvided);
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
