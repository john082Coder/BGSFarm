// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BattleofGuardiansShareToken is ERC20 {
    constructor(address wallet, uint256 supply) ERC20("Battle of Guardians Share","BGS") public {
        require(wallet != address(0), "Invalid address"); 
        _mint(wallet, supply);
    }
}