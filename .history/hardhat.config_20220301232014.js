require('@nomiclabs/hardhat-waffle');
const fs = require('fs');

const rinkebyApiKey = fs.readFileSync('.rinkeby').toString();
const privateKey = fs.readFileSync('.secret').toString();

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${rinkebyApiKey}`,
      accounts: [privateKey],
    },
    // mainnet: {
    //   url: `https://polygon-mumbai.g.alchemy.com/v2/${YOUR_ALCHEMY_API_KEY}`,
    //   accounts: [YOUR_PRIVATE_MAINNET_ACCOUNT_KEY],
    // },
  },
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
