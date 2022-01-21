//Solidity Version
pragma solidity >=0.4.22 <0.9.0;

// Store a single data point and allow fetching/updating of that datapoint
contract SimpleStorage {
    
    // data point
    string public storedData = '';
    
    event myEventTest(string eventOutput);
    
    function setData(string calldata _myText) external {
        storedData = _myText;
    }
    
    function getData() external view returns (string memory) {
        return storedData;
    }
    
}