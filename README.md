# my-first-hardhat

First crypto project develped using [Hardhat](https://hardhat.org/) (instead of Truffle).

This project, and README file are following the excellent video by Julien on [How to use Hardhat](https://www.youtube.com/watch?v=9Qpi80dQsGU).

## This repo includes:

1. Smart contract
1. Tests
1. Debug
1. Deployment (in-memory, actual network)
1. Frontend

## How to start from scratch

### Setup
1. `npm init -y` - create new project
1. `npm i -D hardhat` - install hardhat as dev dependency
1. `npx hardhat` - run and choose empty config
1. `npm i -D ethers @nomiclabs/hardhat-ethers ethereum-waffle @nomiclabs/hardhat-waffle chai` -install plugins and test platforms
1. Add `require('@nomiclabs/hardhat-waffle');` at top of config file. No need to require the ethers plugin, since the waffle plugin requires it.

### Develop
1. Create a contracts folder and start working on Solidity contracts!
1. Compile using `npx hardhat compile`

### Test
1. Create a test folder and put your test files in there
1. Start the test file with `const {expect} = require('chai');`
1. The `ethers` object is injected automatically into the test. Use it to deploy the contract and get the addresses:  
    ```
    Token = await ethers.getContractFactory('Token');
    token = await Token.deploy();
    [owner, addr1, addr2, _] = await ethers.getSigners();
    ```
1. No need to do BigNumber conversions - hardhat does it for you
1. Run tests with `npx hardhat test`

### Debug
1. Add `import 'hardhat/console.sol';` at the top of your contract file
1. Use `console.log` statments, using substitution strings (read more [here](https://hardhat.org/hardhat-network/#console-log))
1. When you run your tests, you'll be able to see values in the console window

### Deploy
1. Create a directory called `scripts` and a `deploy.js` file in it
1. The ethers object is injected automatically into the test. Use it to deploy the contract:
    ```
    Token = await ethers.getContractFactory('Token');
    token = await Token.deploy();
    ```
1. To deploy to Hardhat in-memory blockchain: `npx hardhat run scripts/deploy.js`
1. To deploy to other networks (ie Rinkeby):
    1. Get the Infura URL and private key of the account to use for deployment:
        1. Create a `.env` file
        1. Add `INFURA_RINKBEY_URL=` to `.env` with your [Rinkeby Infura key](https://infura.io/) (get free project)
        1. Add `RINKEBEY_PRIVATEKEY=` to `.env` with the private key of the account you intend to use
        1. Add `.env` to `.gitignore` to avoid saving file to repo
        1. Run `npm i -D dotenv`
        1. Add the line `require('dotenv').config();` to the top of `hardhat.config.js`
    1. Add the network to the config in `hardhat.config.js`:
        ```
        networks: {
            rinkeby: {
                url: process.env.INFURA_RINKBEY_URL,
                accounts: [`0x${process.env.RINKBEY_PRIVATE_KEY}`]
            }
        }
        ```
    1. Deploy: `npx hardhat run scripts/deploy.js --network rinkeby`
    1. Check on [Rinkeby Etherscan](https://rinkeby.etherscan.io) to verify your contract has been deployed to that address
    1. You can now repeat the same with mainnet, or other testnets, by adding keys to `.env` and networks to `hardhat.config.js`

### Frontend

Unlike Truffle, we need to generate the abi file/s ourselves, to allow the frontend to interact with our contract.  

1. We'll first create a `frontend` folder and a `src` subfolder.
1. We'll add the following to our `deploy.js`:
    ```
    const fs = require('fs');
    // ... rest of the deployemnt
    // after the .deploy()
    const data = {
        address: token.address,
        abi: JSON.parse(token.interface.format('json'))
    }
    fs.writeFileSync('frontend/src/Token.js', JSON.stringify(data));
    ```
1. We'll then run a local blockchain: `npx hardhat node`
1. We'll deploy the contract to the local chain (in a separate console window!): `npx hardhat run scripts/deploy.js --network localhost`
1. Our contract is now deployed, and the abi file created. We can use the localhost chain to debug, and finally redeploy again to any chain we need.
1. The `App.js` and `ethereum.js` files in `frontend/src` show how to connect to, and use our contract.
1. You can use `create-react-app` to bootstrap the app, and add `ethers` and `bootstrap` modules to have a workable app.
