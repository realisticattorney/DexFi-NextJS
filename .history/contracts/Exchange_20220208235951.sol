//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./Registry.sol";

contract Exchange is ERC20 {
    address public tokenAddress;
    address public registryAddress;

    mapping(address => address) public referrers;

    constructor(address _token) ERC20("DexFi LP Tokens", "XFI") {
        require(
            _token != address(0),
            "token address cannot be the zero address"
        );
        tokenAddress = _token;
        registryAddress = msg.sender;
    }

    function addLiquidity(uint256 _tokenAmount)
        public
        payable
        returns (uint256)
    {
        uint256 liquidity;
        if (totalSupply() == 0) {
            liquidity = address(this).balance;
        } else {
            uint256 ethReserve = address(this).balance - msg.value;
            uint256 tokenReserve = getReserve();
            uint256 correctTokenAmount = (msg.value * tokenReserve) /
                ethReserve;
            require(
                _tokenAmount >= correctTokenAmount,
                "Token amount is too low"
            );
            liquidity = (totalSupply() * msg.value) / ethReserve;
        }
        IERC20 token = IERC20(tokenAddress);
        token.transferFrom(msg.sender, address(this), _tokenAmount);
        _mint(msg.sender, liquidity);
        return liquidity;
    }

    function removeLiquidity(uint256 _amount)
        public
        returns (uint256, uint256)
    {
        require(_amount > 0, "Amount is too low");
        uint256 ethWithdrawn = (address(this).balance * _amount) /
            totalSupply();
        uint256 tokenWithdrawn = (getReserve() * _amount) / totalSupply();
        _burn(msg.sender, _amount);
        payable(msg.sender).transfer(ethWithdrawn);
        IERC20 token = IERC20(tokenAddress);
        token.transfer(msg.sender, tokenWithdrawn);
        return (ethWithdrawn, tokenWithdrawn);
    }

    function getReserve() public view returns (uint256) {
        return IERC20(tokenAddress).balanceOf(address(this));
    }

    function _getAmount(
        uint256 inputAmount,
        uint256 inputReserve,
        uint256 outputReserve
    ) private pure returns (uint256) {
        uint256 fee = 99;
        uint256 inputAmountwithFee = inputAmount * fee;
        uint256 numerator = inputAmountwithFee * outputReserve;
        uint256 denominator = ((inputReserve * 100) + inputAmountwithFee);
        uint256 outputAmount = numerator / denominator;
        return outputAmount;
    }

    function getTokenAmount(uint256 _ethSold) public view returns (uint256) {
        require(_ethSold > 0, "You must have some ETH");
        uint256 tokenReserve = getReserve();
        return _getAmount(_ethSold, address(this).balance, tokenReserve);
    }

    function getEthAmount(uint256 _tokenSold) public view returns (uint256) {
        require(_tokenSold > 0, "You must have some ETH");
        uint256 tokenReserve = getReserve();
        return _getAmount(_tokenSold, tokenReserve, address(this).balance);
    }

    function ethToToken(uint256 _minAmount, address recipient) private {
        require(msg.value > 0, "You must have some ETH");
        uint256 tokenAmount = _getAmount(
            msg.value,
            address(this).balance - msg.value,
            getReserve()
        );
        require(
            tokenAmount >= _minAmount,
            "Not enough liquidity in the contract to get the minimum amount"
        );
        IERC20 token = IERC20(tokenAddress);
        token.transfer(recipient, tokenAmount);
    }

    function ethToTokenSwap(uint256 _minTokens, address _referrer)
        public
        payable
    {
        ethToToken(_minTokens, msg.sender);
        uint256 swapLps = (totalSupply() * msg.value) /
            (200 * address(this).balance);

        if (
            _referrer != address(0) &&
            _referrer != msg.sender &&
            referrers[address(msg.sender)] == address(0) &&
            address(_referrer).balance > 0
        ) {
            referrers[address(msg.sender)] = _referrer;
        }

        if (referrers[address(msg.sender)] != address(0)) {
            address k = address(msg.sender);
            for (uint256 i = 1; i < 10; i += 4) {
                uint256 _swapLps = swapLps / i;
                _mint(k, _swapLps);
                k = referrers[k];
                if (k == address(0)) {
                    break;
                }
            }
        } else {
            _mint(msg.sender, swapLps);
        }
    }

    function ethToTokenTransfer(uint256 _minTokens, address recipient)
        public
        payable
    {
        ethToToken(_minTokens, recipient);
    }

    function tokenToTokenSwap(
        uint256 _tokensSold,
        uint256 _minTokensBought,
        address _tokenAddress //dai or else token address
    ) public {
        //this is the scamm exchange
        //user wants to get dai paying w scamm
        //we look at the registry what's the exchange of such pair of tokens
        address exchangeAddress = Registry(registryAddress).getExchange(
            _tokenAddress
        );

        require(
            exchangeAddress != address(0),
            "There's no registry for this token"
        );
        require(exchangeAddress != address(this), "Invalid exchange address");

        uint256 tokenReserve = getReserve();
        uint256 ethBought = _getAmount(
            _tokensSold,
            tokenReserve,
            address(this).balance
        );

        IERC20(tokenAddress).transferFrom(
            msg.sender,
            address(this),
            _tokensSold
        );
        Exchange(exchangeAddress).ethToTokenTransfer{value: ethBought}(
            _minTokensBought,
            msg.sender
        );
    }

    function tokenToEthSwap(
        uint256 _tokenAmount,
        uint256 _minEth,
        address _referrer
    ) public payable {
        require(_tokenAmount > 0, "You must have some tokens");
        uint256 ethAmount = _getAmount(
            _tokenAmount,
            getReserve(),
            address(this).balance
        );
        require(
            ethAmount >= _minEth,
            "Not enough liquidity in the contract to get the minimum amount"
        );
        IERC20 token = IERC20(tokenAddress);
        token.transferFrom(msg.sender, address(this), _tokenAmount);
        payable(msg.sender).transfer(ethAmount);
        uint256 swapLps = ((totalSupply() * ethAmount) /
            (200 * address(this).balance));

        if (
            _referrer != address(0) &&
            _referrer != msg.sender &&
            referrers[address(msg.sender)] == address(0) &&
            address(_referrer).balance > 0
        ) {
            referrers[address(msg.sender)] = _referrer;
        }

        if (referrers[address(msg.sender)] != address(0)) {
            address k = address(msg.sender);
            for (uint256 i = 1; i < 10; i += 4) {
                uint256 _swapLps = swapLps / i;
                _mint(k, _swapLps);
                k = referrers[k];
                if (k == address(0)) {
                    break;
                }
            }
        } else {
            _mint(msg.sender, swapLps);
        }
    }
}
