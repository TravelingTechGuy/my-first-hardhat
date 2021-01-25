const fs = require('fs');

const main = async () => {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with account ${deployer.address}`);
  
  const balance = await deployer.getBalance();
  console.log(`Account balance: ${balance.toString()}`);

  const Token = await ethers.getContractFactory('Token');
  const token = await Token.deploy();
  console.log(`Token address: ${token.address}`);

  const data = {
    address: token.address,
    abi: JSON.parse(token.interface.format('json'))
  }
  fs.writeFileSync('frontend/src/Token.js', JSON.stringify(data));
};

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
