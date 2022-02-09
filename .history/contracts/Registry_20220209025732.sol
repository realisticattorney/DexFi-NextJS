//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./Exchange.sol";

contract Registry {
    mapping(address => address) public tokenToExchange;

    event NewExchange(address indexed token, address indexed exchange);

    function getExchange(address _tokenAddress) public view returns (address) {
        return tokenToExchange[_tokenAddress];
    }

    function createExchange(address _tokenAddress) public returns (address) {
        require(_tokenAddress != address(0), "token address cannot be 0");
        require(
            tokenToExchange[_tokenAddress] == address(0),
            "exchange already exists"
        );
        
        Exchange exchange = new Exchange(_tokenAddress); //data type Exchange
        tokenToExchange[_tokenAddress] = address(exchange);
        return address(exchange);
    }
}
