const {constants} = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { ethers, waffle } = require('hardhat');
const { provider } = waffle;
describe('Registry deployment', function () {
  beforeEach(async function () {
    const Registry = await ethers.getContractFactory('Registry');
    registry = await Registry.deploy(); //do not define registry as const, it won't make it outside the beforeEach function scope
    await registry.deployed();

    const [deployer] = await ethers.getSigners();

    const Token = await ethers.getContractFactory('ScammCoin');
     token = await Token.deploy(ethers.utils.parseEther('1000'));
    await token.deployed();

    //  const exchange = await registry.createExchange(token.address);

    console.log('Deployer address:', deployer.address);
    console.log('Registry contract address:', registry.address);
    console.log('ScammCoin contract address:', token.address);
    //  console.log('ScammExchange contract address:', exchange.address);
  });

  it('ScammExchange instance in Registry mapping', async function () {
    const scammExchange = await registry.getExchange(token.address);

    expect(scammExchange).to.equal(constants.ZERO_ADDRESS);
  });
});
