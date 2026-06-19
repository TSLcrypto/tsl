// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract TokenOneBEP20Upgradeable is Initializable {
    string public name;
    string public symbol;
    uint8 public decimals;

    uint256 public totalSupply;
    uint256 public maxSupply;

    string public metaURI;
    address public owner;

    bool public buySellEnabled;
    address public lpV1;
    address public lpV2;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed tokenOwner, address indexed spender, uint256 value);
    event OwnershipTransferred(address indexed oldOwner, address indexed newOwner);
    event MetaURIUpdated(string oldURI, string newURI);

    event BuySellEnabledUpdated(bool enabled);
    event LpV1Updated(address indexed oldLp, address indexed newLp);
    event LpV2Updated(address indexed oldLp, address indexed newLp);

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner");
        _;
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 initialSupply_,
        uint256 maxSupply_,
        string memory metaURI_,
        address owner_
    ) external initializer {
        require(owner_ != address(0), "owner zero");
        require(bytes(name_).length > 0, "empty name");
        require(bytes(symbol_).length > 0, "empty symbol");
        require(bytes(metaURI_).length > 0, "empty meta");
        require(initialSupply_ <= maxSupply_, "supply > cap");

        name = name_;
        symbol = symbol_;
        decimals = decimals_;
        maxSupply = maxSupply_;
        metaURI = metaURI_;
        owner = owner_;
        buySellEnabled = true;

        _mint(owner_, initialSupply_);
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        require(spender != address(0), "spender zero");

        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);

        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        uint256 allowed = allowance[from][msg.sender];
        require(allowed >= amount, "allowance");

        if (allowed != type(uint256).max) {
            allowance[from][msg.sender] = allowed - amount;
            emit Approval(from, msg.sender, allowance[from][msg.sender]);
        }

        _transfer(from, to, amount);
        return true;
    }

    function setMetaURI(string calldata newURI) external onlyOwner {
        require(bytes(newURI).length > 0, "empty");

        string memory old = metaURI;
        metaURI = newURI;

        emit MetaURIUpdated(old, newURI);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "owner zero");

        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function setBuySellEnabled(bool enabled) external onlyOwner {
        buySellEnabled = enabled;
        emit BuySellEnabledUpdated(enabled);
    }

    function setLpV1(address newLp) external onlyOwner {
        address oldLp = lpV1;
        lpV1 = newLp;
        emit LpV1Updated(oldLp, newLp);
    }

    function setLpV2(address newLp) external onlyOwner {
        address oldLp = lpV2;
        lpV2 = newLp;
        emit LpV2Updated(oldLp, newLp);
    }

    function tokenURI() external view returns (string memory) {
        return metaURI;
    }

    function _mint(address to, uint256 amount) internal {
        require(to != address(0), "to zero");
        require(totalSupply + amount <= maxSupply, "cap exceeded");

        totalSupply += amount;
        balanceOf[to] += amount;

        emit Transfer(address(0), to, amount);
    }

    function _transfer(address from, address to, uint256 amount) internal {
        require(to != address(0), "to zero");
        require(balanceOf[from] >= amount, "balance");

        bool isBuyOrSell =
            from == lpV1 ||
            to == lpV1 ||
            from == lpV2 ||
            to == lpV2;

        if (isBuyOrSell) {
            require(buySellEnabled, "buy/sell disabled");
        }

        balanceOf[from] -= amount;
        balanceOf[to] += amount;

        emit Transfer(from, to, amount);
    }
}