// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "./interfaces/IERC20.sol";
import "./interfaces/Uniswap.sol";
import "hardhat/console.sol";

contract testSwap {
    //address of the uniswap v2 router
    address private constant UNISWAP_V2_ROUTER =
        0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    //address of WETH token- its better to trade through WETH.
    address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    // swap function
    function swap(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint256 _amountOutMin,
        address _to
    ) external {
        // transfer the amount in tokens from msg.sender to this contract
        IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);

        //by calling IERC20 approve you allow the uniswap contract to spend the tokens in this contract
        IERC20(_tokenIn).approve(UNISWAP_V2_ROUTER, _amountIn * 2);

        address[] memory path;
        path = new address[](2);
        path[0] = _tokenIn; // DAI
        path[1] = WETH;
        // path[2] = _tokenOut; //WBTC
        console.log(IUniswapV2Router(UNISWAP_V2_ROUTER).WETH());
        uint256[] memory amounts = IUniswapV2Router(UNISWAP_V2_ROUTER).getAmountsOut(
            10000,
            path
        );
        console.log(amounts[0]);
        console.log(amounts[1]);
        // IUniswapV2Router(UNISWAP_V2_ROUTER).swapExactTokenforTokens(
        //     10000,
        //     1,
        //     path,
        //     address(this),
        //     1670698181
        // );
    }
}