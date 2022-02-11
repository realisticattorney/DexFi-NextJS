const { ethers } = require('hardhat');

async function main() {
  const Registry = await ethers.getContractFactory('Registry');
  const registry = await Registry.deploy(); //do not define registry as const, it won't make it outside the beforeEach function scope
  await registry.deployed();

  const [deployer] = await ethers.getSigners();

  const Token = await ethers.getContractFactory('ScammCoin');
  const token = await Token.deploy(ethers.utils.parseEther('1000'));
  await token.deployed();

  // console.log('Deployer address:', deployer.address);
  // console.log('Registry contract address:', registry.address);
  // console.log('ScammCoin contract address:', token.address);

  let scammExchange = await registry.createExchange(token.address);
  let txReceipt = await scammExchange.wait();
  let [, exchangeAddress] = txReceipt.events[0].args;
  let getExchangeAddress = await registry.getExchange(token.address);
  console.log('Receipt:', exchangeAddress);
  console.log('Mapping of ScammExchange contract address:', getExchangeAddress);
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
