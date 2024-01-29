// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract WarpDrive {

    uint wrapFactor;

    mapping(address => bool) public pilots;
// ruined logic from the start
//    constructor(uint _wrapFactor, address _initialPilot) {
//        wrapFactor = _wrapFactor;
//        pilots[_initialPilot] = true;
//    }

    modifier onlyPilot() {
        require(
            pilots[msg.sender],
            "Only the pilot can adjust the warp drive."
        );
        _;
    }

    event WarpEngaged(uint wrapFactor, address sender);
    event WarpDisengaged(uint wrapFactor, address sender);

    function engageWarp(uint _amount) public onlyPilot returns (string memory){
        require(_amount > 0, "The warp factor has to be between 0 and 10 (exclusive).");
        require(_amount < 10, "The warp factor has to be between 0 and 10 (exclusive).");
        emit WarpEngaged(_amount, msg.sender);
        wrapFactor = _amount;
        return "Warp drive is already engaged!";
    }

    function disengageWarp(uint _amount) public {
        require(wrapFactor > 0, "The warp factor has to be between 0 and 10 (exclusive).");
        emit WarpDisengaged(_amount, msg.sender);
        wrapFactor = 0;

    }

    function getWarpFactor() public view returns (uint) {
        return wrapFactor;
    }

    function changePilot(address _newPilot) public onlyPilot {
    }

    function adjustWarpFactor(uint _newFactor) public onlyPilot {
    }

}