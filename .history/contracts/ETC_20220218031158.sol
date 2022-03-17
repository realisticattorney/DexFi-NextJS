//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 {
    constructor(string memory name, uint256 initialSupply) ERC20("ETC FAKE", "ETC") {
        _mint(msg.sender, initialSupply);
    }
}
