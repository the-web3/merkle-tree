// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract AirdropManagerV2 is Initializable {
    using SafeERC20 for IERC20;

    IERC20 public token;
    bytes32 public merkleRoot;

    mapping(address => bool) public claimed;

    uint256 public version;

    event AirdropClaimed(address indexed account, uint256 amount);

    constructor() {
        _disableInitializers();
    }

    function initialize(IERC20 _token, bytes32 _merkleRoot) public initializer {
        token = _token;
        merkleRoot = _merkleRoot;
    }

    function claimAirdrop(uint256 amount, bytes32[] calldata merkleProof) external {
        require(!claimed[msg.sender], "Airdrop already claimed");

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender, amount));

        require(MerkleProof.verify(merkleProof, merkleRoot, leaf), "Invalid Merkle proof");

        claimed[msg.sender] = true;

        token.safeTransfer(msg.sender, amount);

        emit AirdropClaimed(msg.sender, amount);
    }

    function setVersion(uint256 _version) external {
        version = _version;
    }

    function getVersion() external view  returns (uint256) {
        return version;
    }
}
