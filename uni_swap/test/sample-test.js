const { BigNumber } = require("@ethersproject/bignumber");
const { expect } = require("chai");
const { ethers } = require("hardhat");

const IERC20ABI = ("../artifacts/contracts/interfaces/IERC20.sol/IERC20.json");
const TOKEN_IN_ABI = require("@uniswap/v2-core/build/ERC20.json").abi;

describe("Test Swap", function () {

    const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const WBTC = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
    const my_address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const DAIHolder = "0x5d38b4e4783e34e2301a2a36c39a03c45798c4dd";
    let TestSwapContract;

    const AMOUNT_IN = 1000000; // 100,000 DAI
    const AMOUNT_OUT_MIN = 1;
    const TOKEN_IN = DAIAddress;
    const TOKEN_OUT = WBTC;
    const TO = my_address;

    beforeEach(async () => {
        const TestSwapFactory = await ethers.getContractFactory("testSwap");
        TestSwapContract = await TestSwapFactory.deploy();
        await TestSwapContract.deployed();
    })

    it("should swap", async () => {
        // impersonate acc
        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [DAIHolder],
        });
        const impersonateSigner = await ethers.getSigner(DAIHolder);
        const TOKEN_INCONTRACT = new ethers.Contract(TOKEN_IN, TOKEN_IN_ABI, impersonateSigner)
        await TOKEN_INCONTRACT.approve(TestSwapContract.address, AMOUNT_IN)

        await TestSwapContract.connect(impersonateSigner).swap(
            TOKEN_IN,
            TOKEN_OUT,
            10005,
            AMOUNT_OUT_MIN,
            TO,
        )
        expect(0).to.equal(0);
    })
})