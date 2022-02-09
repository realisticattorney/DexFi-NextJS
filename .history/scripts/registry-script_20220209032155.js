const { ethers } = require('hardhat');

async function main() {
  const Registry = await ethers.getContractFactory('Registry');
  const registry = await Registry.deploy();
  await registry.deployed();

  const [deployer] = await ethers.getSigners();

  const Token = await ethers.getContractFactory('ScammCoin');
  token = await Token.deploy(ethers.utils.parseEther('1000'));
  await token.deployed();

  // const Exchange = await ethers.getContractFactory('Exchange');
  // exchange = await Exchange.deploy(token.address);
  // await exchange.deployed();

  const 

  console.log('Registry contract address:', registry.address);
  console.log('ScammCoin contract address:', token.address);
  console.log('ScammExchange contract address:', exchange.address);

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
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
