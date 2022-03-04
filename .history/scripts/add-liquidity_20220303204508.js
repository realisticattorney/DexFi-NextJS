const { ethers, waffle } = require('hardhat');
const { provider } = waffle;
const amountA = ethers.utils.parseEther('20000');
const amountB = ethers.utils.parseEther('40');
const amountC = ethers.utils.parseEther('20');
const amountD = ethers.utils.parseEther('10');
const amountSupply = ethers.utils.parseEther('100000');
async function main() {

  const Exchange = await ethers.getContractFactory('Exchange');

  const scammExchangeContract = await Exchange.attach(scammExchangeAddress);
  const USDCExchangeContract = await Exchange.attach(USDCExchangeAddress);
  const ETCExchangeContract = await Exchange.attach(ETCExchangeAddress);

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
  await USDCExchangeContract.addLiquidity(amountA, { value: amountC });
  const ethProvidedTwo = ethers.utils.formatEther(
    await provider.getBalance(USDCExchangeContract.address)
  );
  console.log('EthProvidedToUSDCExchange', ethProvidedTwo);

  await tokenThree.approve(ETCExchangeContract.address, amountA);
  const allowanceAmountThree = ethers.utils.formatEther(
    await tokenThree.allowance(deployer.address, ETCExchangeContract.address)
  );
  console.log('AllowedETCToTranfer', allowanceAmountThree);
  await ETCExchangeContract.addLiquidity(amountA, { value: amountD });
  const ethProvidedThree = ethers.utils.formatEther(
    await provider.getBalance(ETCExchangeContract.address)
  );
  console.log('EthProvidedToETCExchange', ethProvidedThree);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

