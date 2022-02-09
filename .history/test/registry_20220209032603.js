const { expect } = require('chai');
const { ethers, waffle } = require('hardhat');
const { provider } = waffle;

describe('Exchange NoRefs', function () {
  beforeEach(async function () {
   const Registry = await ethers.getContractFactory('Registry');
   const registry = await Registry.deploy();
   await registry.deployed();
 
   const [deployer] = await ethers.getSigners();
 
   const Token = await ethers.getContractFactory('ScammCoin');
   const token = await Token.deploy(ethers.utils.parseEther('1000'));
   await token.deployed();
 
   const Exchange = await registry.createExchange(token.address);
   
   console.log('Deployer address:', deployer.address);
   console.log('Registry contract address:', registry.address);
   console.log('ScammCoin contract address:', token.address);
   console.log('ScammExchange contract address:', exchange.address);
 
  });

  it('Adds liquidity', async function () {
    await token.approve(exchange.address, amountA);
    const allowanceAmount = ethers.utils.formatEther(
      await token.allowance(signer.address, exchange.address)
    );
    console.log('AllowedScammCoinsToTranfer', allowanceAmount);
    await exchange.addLiquidity(amountA, { value: amountB });
    const ethProvided = ethers.utils.formatEther(
      await provider.getBalance(exchange.address)
    );
    console.log('AllowedEthToTranfer: ' + ethProvided);
    expect(await provider.getBalance(exchange.address)).to.equal(amountB);
    expect(await exchange.getReserve()).to.equal(amountA);
  });
});
