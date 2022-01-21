// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Account {
    string public account = "0x0000000000000000000000000000000000000000";

    function getAccount() external view returns (string memory) {
        return account;
    }

    function setAccount(string calldata _account) external {
        account = _account;
    }
}
