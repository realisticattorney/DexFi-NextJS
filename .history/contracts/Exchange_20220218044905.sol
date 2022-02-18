//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./Registry.sol";

contract Exchange is ERC20 {
    address public tokenAddress;
    address public registryAddress;

    event TokenPurchase(
        address indexed buyer,
        uint256 indexed ethSold,
        uint256 indexed tokensBought
    );
    event EthPurchase(
        address indexed buyer,
        uint256 indexed tokensSold,
        uint256 indexed ethBought
    );
    event AddLiquidity(
        address indexed provider,
        uint256 indexed ethAmount,
        uint256 indexed tokenAmount
    );
    event RemoveLiquidity(
        address indexed provider,
        uint256 indexed ethAmount,
        uint256 indexed tokenAmount
    );

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
            uint256 tokenReserve = getReserve(); //reserve of the token that's not ETH on the pair the LP provided
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
        emit AddLiquidity(msg.sender, msg.value, _tokenAmount);
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

        emit RemoveLiquidity(msg.sender, ethWithdrawn, tokenWithdrawn);

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
        require(inputReserve > 0 && outputReserve > 0, "invalid reserves");

        uint256 inputAmountwithFee = inputAmount * 99;
        uint256 numerator = inputAmountwithFee * outputReserve;
        uint256 denominator = (inputReserve * 100) + inputAmountwithFee;
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

        emit TokenPurchase(msg.sender, msg.value, tokenAmount);
    }

    function ethToTokenSwap(uint256 _minAmount) public payable {
        ethToToken(_minAmount, msg.sender);
    }

    function ethToTokenTransfer(uint256 _minAmount, address recipient)
        public
        payable
    {
        ethToToken(_minAmount, recipient);
    }

    function tokenToEthSwap(uint256 _tokenAmount, uint256 _minEth)
        public
        payable
    {
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
        emit EthPurchase(msg.sender, ethAmount, _tokenAmount);
    }

    function tokenToTokenSwap(
        uint256 _tokensSold,
        uint256 _minTokensBought,
        address _tokenAddress
    ) public {
        address exchangeAddress = Registry(registryAddress).getExchange(
            _tokenAddress
        );

        require(
            exchangeAddress != address(0),
            "There's no registry for this token"
        );
        require(exchangeAddress != address(this), "Invalid exchange address");

        uint256 ethBought = _getAmount(
            _tokensSold,
            getReserve(),
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
    function getTokenToTokenAmount(
        uint256 _tokensSold,
        address _tokenAddress
public view returns (uint256)
        address exchangeAddress = Registry(registryAddress).getExchange(
            _tokenAddress
        );

        require(
            exchangeAddress != address(0),
            "There's no registry for this token"
        );
        require(exchangeAddress != address(this), "Invalid exchange address");

        uint256 ethBought = _getAmount(
            _tokensSold,
            getReserve(),
            address(this).balance
        );
;
        return Exchange(exchangeAddress).getTokenAmount(ethBought);
    }
}
