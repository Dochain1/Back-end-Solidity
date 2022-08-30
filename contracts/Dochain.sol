// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";

error Dochain__VerifyFailed();

/** @title Dochain Contract
 * @author pinajmr
 * @notice Briefcase decentralized
 * @dev This implements the Chainlink Keppers and Openzeppelin library
 */

contract Dochain is AccessControl, Pausable, ERC721URIStorage, KeeperCompatibleInterface {
    /* Type declarations */
    using ECDSA for bytes32;
    using Counters for Counters.Counter;

    Counters.Counter public tokenIdCounter;

    /* Declarer roles */
    bytes32 public constant ROL_ADMIN = keccak256("ROL_ADMIN");
    bytes32 public constant ROL_VISITOR = keccak256("ROL_VISITOR");

    /* State Variable*/
    // Dochain variables
    string private s_hash;
    string private s_newHash;
    uint256 private s_lastTimeStamp;
    uint256 private immutable i_interval;

    /* Events */
    event AddRole(address indexed lawyer);
    event DeleteRole(address indexed lawyer);
    event NewHash(string indexed newHash);
    event MintSuccess(uint256, string indexed newNFT);
    event TriggerHash(uint256, string indexed newHash);

    constructor(
        address[] memory adminlawyer,
        address[] memory lawyerVisitor,
        uint256 interval,
        string memory hashs
    ) ERC721("Briefcase", "BC") {
        // Role assignment
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());

        for (uint8 i = 0; i < adminlawyer.length; i++) {
            _grantRole(ROL_ADMIN, adminlawyer[i]);
        }

        for (uint8 i = 0; i < lawyerVisitor.length; i++) {
            _grantRole(ROL_VISITOR, lawyerVisitor[i]);
        }

        i_interval = interval;
        s_lastTimeStamp = block.timestamp;
        s_hash = hashs;
    }

    /**
     * @dev This is the function that the Chainlink Keeper nodes call
     * they look for `upkeepNeeded` to return True.
     * the following should be true for this to return true:
     * 1. The time interval has passed 1 week
     * 2. The hashes have to be different
     * 3. The subscription is funded with LINK.
     */
    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        override
        returns (
            bool upkeepNeeded,
            bytes memory /* performData */
        )
    {
        bool timePassed = ((block.timestamp - s_lastTimeStamp) > i_interval);
        bool chageHash = _compareStrings(s_hash, s_newHash);
        upkeepNeeded = (timePassed && !chageHash);
    }

    /**
     * @dev Once `checkUpkeep` is returning `true`, this function is called
     * and old hash is change for new one.
     */
    function performUpkeep(
        bytes calldata /* performData */
    ) external override {
        if ((block.timestamp - s_lastTimeStamp) > i_interval) {
            s_lastTimeStamp = block.timestamp;
            uint256 tokenId = tokenIdCounter.current() - 1;
            s_hash = s_newHash;
            _setTokenURI(tokenId, s_hash);
            emit TriggerHash(tokenId, s_hash);
        }
    }

    function readDocumentation(bytes32 message, bytes memory sign)
        public
        view
        onlyRole(ROL_VISITOR)
        whenNotPaused
        returns (bool)
    {
        if (_verify(message, sign, _msgSender())) {
            revert Dochain__VerifyFailed();
        }
        return true;
    }

    // Insert new change
    function newHashDocumentation(string memory newHash) public whenNotPaused onlyRole(ROL_ADMIN) {
        s_newHash = newHash;
        emit NewHash(s_newHash);
    }

    function safeMint(address to) public whenNotPaused onlyRole(ROL_VISITOR) {
        uint256 tokenId = tokenIdCounter.current();
        tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, s_hash);
        emit MintSuccess(tokenId, s_hash);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721URIStorage)
        onlyRole(ROL_VISITOR)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function addRole(address newLawyer, bytes32 role) public onlyRole(ROL_ADMIN) whenNotPaused {
        _grantRole(role, newLawyer);
        emit AddRole(newLawyer);
    }

    function deleteRoleVisit(address lawyerVisitor) public onlyRole(ROL_ADMIN) whenNotPaused {
        _revokeRole(ROL_VISITOR, lawyerVisitor);
        emit DeleteRole(lawyerVisitor);
    }

    function pause() public onlyRole(ROL_ADMIN) {
        _pause();
    }

    function unpause() public onlyRole(ROL_ADMIN) {
        _unpause();
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /* Internal Functions*/
    /// Verification function with signature
    function _verify(
        bytes32 data,
        bytes memory signature,
        address account
    ) internal pure returns (bool) {
        return data.toEthSignedMessageHash().recover(signature) == account;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721) whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721URIStorage) {
        super._burn(tokenId);
    }

    function _compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    /* Getter functions */
    function getActualHash() public view returns (string memory) {
        return s_hash;
    }

    function getNewHash() public view returns (string memory) {
        return s_newHash;
    }

    function getlastTimeStamp() public view returns (uint256) {
        return s_lastTimeStamp;
    }

    function getInterval() public view returns (uint256) {
        return i_interval;
    }
}
