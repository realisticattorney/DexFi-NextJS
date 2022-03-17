const { ethers } = require('hardhat');

const main = async () => {
  const scammCoinContractFactory = await ethers.getContractFactory('ScammCoin');

  const scammCoinContract = await scammCoinContractFactory.deploy(
    ethers.utils.parseEther('1000')
  );

  await scammCoinContract.deployed();
  console.log('Contract deployed to:', scammCoinContract.address);

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
