# my-first-hardhat

First crypto project develped using Hardhat (instead of Truffle).

Includes:

1. Smart contract
1. Tests
1. Frontend

## How to start from scratch

1. `npm init -y` - create new project
1. `npm i -D hardhat` - install hardhat as dev dependency
1. `npx hardhat` - run and choose empty config
1. `npm i -D ethers @nomiclabs/hardhat-ethers ethereum-waffle @nomiclabs/hardhat-waffle chai` -install plugins and test platforms
1. Add `require('@nomiclabs/hardhat-waffle');` at top of config file. No need to require the ethers plugin, since the waffle plugin requires it.
1. Create a contracts folder and start working on Solidity contracts!
1. Compile using `npx hardhat compile`
1. Create a test folder and put your test files in there
1. Start the test file with `const {expect} = require('chai');`
1. The `ethers` object is injected automatically into the test
1. No need to do BigNumber conversions - hardhat does it for you
1. Run tests with `npx hardhat test`
