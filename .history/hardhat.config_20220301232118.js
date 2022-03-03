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
