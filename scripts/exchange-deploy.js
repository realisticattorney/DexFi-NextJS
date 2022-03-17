const { ethers } = require('hardhat');

const main = async () => {
  const exchangeContractFactory = await ethers.getContractFactory('Exchange');

  const exchangeContract = await exchangeContractFactory.deploy(
    '0x5264261911f79CFA09A7c8a4eea2CAC216F3d6a2'
  );

  await exchangeContract.deployed();
  console.log('Contract deployed to:', exchangeContract.address);

  console.log('Done deploying!');
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
