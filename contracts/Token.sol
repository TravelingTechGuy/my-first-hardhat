//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.3;

contract Token {
  string public name = 'My Hardhat Token';
  string public symbol = 'MHT';
  uint public totalSupply = 1000000;
  address public owner;
  mapping(address => uint) balances;

  constructor() {
    owner = msg.sender;
    balances[owner] = totalSupply;
  }

  function transfer(address to, uint amount) external {
    require(balances[msg.sender] >= amount, 'Not enough tokens');
    balances[msg.sender] -= amount;
    balances[to] += amount;
  }

  function balanceOf(address account) external view returns(uint) {
    return balances[account];
  }
}
