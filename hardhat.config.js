/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: "0.7.3",
  networks: {
    rinkeby: {
      url: process.env.INFURA_RINKBEY_URL,
      accounts: [`0x${process.env.RINKBEY_PRIVATE_KEY}`]
    }
  }
};
