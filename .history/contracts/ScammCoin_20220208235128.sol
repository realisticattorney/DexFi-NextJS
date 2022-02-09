//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ScammCoin is ERC20 {
    constructor(uint256 initialSupply) ERC20("Scamm Token", "SCM") {
        _mint(msg.sender, initialSupply);
    }
}

// ok entonces para chequear el fee, hago que el balance quede para los LP igual en scammCoins (ponele que el LP inicial era de 20000 scammCoins) lo dejo igual y me fijo cuanto crecio el eth balance en relacion al totalSupply. Si tenia 1% de fee tiene que ser 1% del total de eth devuelto cuando compraron poniendo scamm + el eth vendido a cambio de scamm. Recien probe el contrato inicial y esta bien, tira 13 eth de fee de 1300 eth transaccionados
