// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/*
TSL (BEP-20 / ERC-20 compatible)
- Fixed supply (1,000,000,000)
- Decimals: 18
- No mint / burn
- No tax / blacklist / pause
- Owner only for safe admin utilities
*/

contract TSL {
    // --- ERC20 Metadata ---
    string public constant name = "TSL";
    string public constant symbol = "TSL";
    uint8  public constant decimals = 18;

    // --- Supply ---
    uint256 public totalSupply;

    // --- Ownership ---
    address public owner;

    // --- Balances / Allowances ---
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    // --- Events ---
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "NOT_OWNER");
        _;
    }

    constructor() {
        owner = msg.sender;

        uint256 initialSupply = 1_000_000_000 * (10 ** uint256(decimals));
        totalSupply = initialSupply;
        balanceOf[msg.sender] = initialSupply;

        emit Transfer(address(0), msg.sender, initialSupply);
        emit OwnershipTransferred(address(0), msg.sender);
    }

    // --- ERC20 Core ---
    function transfer(address to, uint256 value) external returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) external returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) external returns (bool) {
        uint256 allowed = allowance[from][msg.sender];
        require(allowed >= value, "ALLOWANCE_TOO_LOW");

        if (allowed != type(uint256).max) {
            allowance[from][msg.sender] = allowed - value;
            emit Approval(from, msg.sender, allowance[from][msg.sender]);
        }

        _transfer(from, to, value);
        return true;
    }

    function _transfer(address from, address to, uint256 value) internal {
        require(to != address(0), "TO_ZERO");
        uint256 bal = balanceOf[from];
        require(bal >= value, "BALANCE_TOO_LOW");

        unchecked {
            balanceOf[from] = bal - value;
            balanceOf[to] += value;
        }

        emit Transfer(from, to, value);
    }

    // --- Owner Utilities ---
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "NEW_OWNER_ZERO");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function rescueERC20(address token, address to, uint256 amount) external onlyOwner {
        require(token != address(this), "CANNOT_RESCUE_SELF");
        require(to != address(0), "TO_ZERO");

        (bool ok, bytes memory data) = token.call(
            abi.encodeWithSignature("transfer(address,uint256)", to, amount)
        );
        require(ok && (data.length == 0 || abi.decode(data, (bool))), "RESCUE_FAILED");
    }

    function recoverBNB(address payable to, uint256 amount) external onlyOwner {
        require(to != address(0), "TO_ZERO");
        require(address(this).balance >= amount, "INSUFFICIENT_BNB");
        (bool ok, ) = to.call{value: amount}("");
        require(ok, "BNB_TRANSFER_FAILED");
    }

    receive() external payable {}
}
