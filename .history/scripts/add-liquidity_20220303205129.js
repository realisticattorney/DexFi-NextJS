const { ethers, waffle } = require('hardhat');
const { provider } = waffle;
const amountA = ethers.utils.parseEther('10000');
const amountB = ethers.utils.parseEther('40');
const amountC = ethers.utils.parseEther('20');
const amountD = ethers.utils.parseEther('10');
async function main() {
  const [deployer] = await ethers.getSigners();
  const Token = await ethers.getContractFactory('ERC20Token');
  const Exchange = await ethers.getContractFactory('Exchange');
  const token = await Token.attach(
    '0x825d35246E3314Eb95eAd10a4DDa98b983f828eB'
  );
  const tokenTwo = await Token.attach(
    '0x72A73Dc659877739445A66A2Ac27B733A19a88d4'
  );
  const tokenThree = await Token.attach(
    '0xc1EE18a97021f63Cb6Ce3569EFD654d4c339215C'
  );

  const scammExchangeContract = await Exchange.attach(
    '0xA055a2cd9283699662E21265D161a6fC8c89Dcd9'
  );
  const USDCExchangeContract = await Exchange.attach(
    '0x40ab42E51fA2B796490F7DA4df1B43752E63DaAC'
  );
  const ETCExchangeContract = await Exchange.attach(
    '0x2b9692498627141c2826dE77a2bC815D068fd2Aa'
  );

//   await token.approve(scammExchangeContract.address, amountA);
//   const allowanceAmount = ethers.utils.formatEther(
//     await token.allowance(deployer.address, scammExchangeContract.address)
//   );
//   console.log('AllowedScammCoinsToTranfer', allowanceAmount);
//   await scammExchangeContract.addLiquidity(amountA, { value: amountB });
//   const ethProvided = ethers.utils.formatEther(
//     await provider.getBalance(scammExchangeContract.address)
//   );
//   console.log('EthProvidedToScammExchange', ethProvided);

//   await tokenTwo.approve(USDCExchangeContract.address, amountA);
//   const allowanceAmountTwo = ethers.utils.formatEther(
//     await tokenTwo.allowance(deployer.address, USDCExchangeContract.address)
//   );
//   console.log('AllowedUSDCToTranfer', allowanceAmountTwo);
//   await USDCExchangeContract.addLiquidity(amountA, { value: amountC });
//   const ethProvidedTwo = ethers.utils.formatEther(
//     await provider.getBalance(USDCExchangeContract.address)
//   );
//   console.log('EthProvidedToUSDCExchange', ethProvidedTwo);

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
