const {expect} = require('chai');
const { ethers } = require('hardhat');

describe('Token contract', () => {
  let Token, token, owner, add1, addr2;

  beforeEach(async () => {
    Token = await ethers.getContractFactory('Token');
    token = await Token.deploy();
    [owner, addr1, addr2, _] = await ethers.getSigners();
  });

  describe('Deployment', () => {
    it('should set the right owner', async () => {
      expect(await token.owner()).to.equal(owner.address);
    });

    it('should assign total supply of token to owner', async () => {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe('Transactions', () => {
    it('should fail if sender doesn`t have enough tokens', async () => {
      await expect(token.connect(addr1).transfer(addr2.address, 1)).to.be.revertedWith('Not enough tokens');
    });

    it('should transfer tokens between accounts', async () => {
      //transfer 50 from owner to addr1
      await token.transfer(addr1.address, 50);
      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);
      //transfer from addr1 to addr2
      await token.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await token.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it('should update token balances', async () => {
      const ownerBalance = await token.balanceOf(owner.address);
      await token.transfer(addr1.address, 100);
      await token.transfer(addr2.address, 50);
      expect(await token.balanceOf(owner.address)).to.be.equal(ownerBalance - 100 - 50);
      expect(await token.balanceOf(addr1.address)).to.be.equal(100);
      expect(await token.balanceOf(addr2.address)).to.be.equal(50);
    });
  });
});
