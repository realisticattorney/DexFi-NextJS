const { expect } = require('chai');
const { ethers, waffle } = require('hardhat');
const { provider } = waffle;

describe('Exchange NoRefs', function () {
  beforeEach(async function () {
    const Token = await ethers.getContractFactory('ScammCoin');
    [signer, addr1, addr2, addr3, addr4, ...addrs] = await ethers.getSigners();
    token = await Token.deploy(ethers.utils.parseEther('1000000'));
    await token.deployed();

    const Exchange = await ethers.getContractFactory('ExchangeNoRefs');
    exchange = await Exchange.deploy(token.address);
    await exchange.deployed();
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
