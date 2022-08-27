// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";

error Dochain__VerifyFailed();

contract Dochain is
  AccessControl,
  Pausable,
  ERC721URIStorage,
  KeeperCompatibleInterface
{
  using ECDSA for bytes32;
  using Counters for Counters.Counter;

  Counters.Counter public tokenIdCounter;
  // Role
  bytes32 public constant ROL_ADMIN = keccak256("ROL_ADMIN");
  bytes32 public constant ROL_VISITOR = keccak256("ROL_VISITOR");

  // Evento for add and delete role
  event AddRole(address indexed lawyer);
  event DeleteRole(address indexed lawyer);
  event NewHash(string indexed newHash);
  event MintSuccess(uint256, string indexed newNFT);
  event TriggerHash(uint256, string indexed newHash);

  uint256 lastTimeStamp;
  uint256 interval;

  string public ipfsUri;
  string public newHash;

  constructor(
    address _adminlawyer,
    address _lawyerVisitor,
    uint256 _interval,
    string memory _ipfsUri
  ) ERC721("Briefcase", "BC") {
    // Role assignment
    _grantRole(ROL_ADMIN, _msgSender());
    _grantRole(ROL_ADMIN, _adminlawyer);
    _grantRole(ROL_VISITOR, _lawyerVisitor);
    interval = _interval;
    lastTimeStamp = block.timestamp;
    ipfsUri = _ipfsUri;
  }

  // Verify
  function readDocumentation(bytes32 _message, bytes memory _sign)
    public
    view
    onlyRole(ROL_ADMIN)
    whenNotPaused
    returns (bool)
  {
    if (_verify(_message, _sign, _msgSender())) {
      revert Dochain__VerifyFailed();
    }
    return true;
  }

  // Insert new change
  function newHashDocumentation(string memory _newHash)
    public
    whenNotPaused
    onlyRole(ROL_ADMIN)
  {
    newHash = _newHash;
    emit NewHash(_newHash);
  }

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
    upkeepNeeded = ((block.timestamp - lastTimeStamp) > interval);
  }

  function performUpkeep(
    bytes calldata /* performData */
  ) external override {
    if ((block.timestamp - lastTimeStamp) > interval) {
      lastTimeStamp = block.timestamp;
      uint256 tokenId = tokenIdCounter.current() - 1;
      ipfsUri = newHash;
      _setTokenURI(tokenId, ipfsUri);
      emit TriggerHash(tokenId, ipfsUri);
    }
  }

  function safeMint(address to) public whenNotPaused onlyRole(ROL_VISITOR) {
    uint256 tokenId = tokenIdCounter.current();
    tokenIdCounter.increment();
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, ipfsUri);
    emit MintSuccess(tokenId, ipfsUri);
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

  // add role for visitor
  function addRolevisitor(address _newlawyerVisitor)
    public
    onlyRole(ROL_ADMIN)
    whenNotPaused
  {
    _grantRole(ROL_VISITOR, _newlawyerVisitor);
    emit AddRole(_newlawyerVisitor);
  }

  // delete role
  function deleteRoleVisit(address _lawyerVisitor)
    public
    onlyRole(ROL_ADMIN)
    whenNotPaused
  {
    _revokeRole(ROL_VISITOR, _lawyerVisitor);
    emit DeleteRole(_lawyerVisitor);
  }

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

  /**
   * Apply function Pausable
   */
  function pause() public onlyRole(ROL_ADMIN) {
    _pause();
  }

  function unpause() public onlyRole(ROL_ADMIN) {
    _unpause();
  }

  function _burn(uint256 tokenId) internal override(ERC721URIStorage) {
    super._burn(tokenId);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, AccessControl)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}
