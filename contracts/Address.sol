// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Address {
    string public addressWallet = "hello";

    function getAddressWallet() external view returns (string memory) {
        return addressWallet;
    }

    function setAddressWallet(string calldata _addressWallet) external {
        addressWallet = _addressWallet;
    }
}
