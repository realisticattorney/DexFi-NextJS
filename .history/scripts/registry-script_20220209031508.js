const { ethers } = require('hardhat');

async function main() {
  const Registry = await ethers.getContractFactory('Registry');
  const registry = await Registry.deploy();
  await registry.deployed();
  console.log("Registry address", registry.address);

  const [deployer] = await ethers.getSigners();
  console.log(
    'Deploying the contracts with the account:',
    await deployer.address
  );

  const Token = await ethers.getContractFactory('ScammCoin');
  token = await Token.deploy(ethers.utils.parseEther('1000000'));
  await token.deployed();

  const Exchange = await ethers.getContractFactory('Exchange');
  exchange = await Exchange.deploy(token.address);
  await exchange.deployed();
  console.log('ScammCoin contract address:', token.address);
  console.log('Exchange contract address:', exchange.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
