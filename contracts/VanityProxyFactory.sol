// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./ProxyImport.sol";

contract VanityProxyFactory {
    event ProxyDeployed(
        address indexed proxy,
        address indexed implementation,
        bytes32 indexed salt
    );

    function deployProxy(
        address implementation,
        bytes32 salt,
        bytes calldata initData
    ) external returns (address proxy) {
        require(implementation != address(0), "implementation zero");

        ProxyImport newProxy = new ProxyImport{salt: salt}(
            implementation,
            initData
        );

        proxy = address(newProxy);

        emit ProxyDeployed(proxy, implementation, salt);
    }

    function predictProxyAddress(
        address implementation,
        bytes32 salt,
        bytes calldata initData
    ) external view returns (address predicted) {
        bytes memory bytecode = abi.encodePacked(
            type(ProxyImport).creationCode,
            abi.encode(implementation, initData)
        );

        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0xff),
                address(this),
                salt,
                keccak256(bytecode)
            )
        );

        predicted = address(uint160(uint256(hash)));
    }
}