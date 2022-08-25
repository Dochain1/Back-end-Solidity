// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

error Dochain__VerifyFailed();

contract Dochain is AccessControl, Pausable {
  using ECDSA for bytes32;

  // Role
  bytes32 public constant ROL_ADMIN = keccak256("ROL_ADMIN");
  bytes32 public constant ROL_VISITOR = keccak256("ROL_VISITOR");

  // Evento for add and delete role
  event AddRole(address indexed lawyer);
  event DeleteRole(address indexed lawyer);

  constructor(address _adminlawyer, address _lawyerVisitor) {
    // Role assignment
    _grantRole(ROL_ADMIN, _msgSender());
    _grantRole(ROL_ADMIN, _adminlawyer);
    _grantRole(ROL_VISITOR, _lawyerVisitor);
  }

  // Read key hash
  function readDocumentation(bytes32 _message, bytes memory _sign)
    public
    view
    onlyRole(ROL_ADMIN)
    returns (bool)
  {
    if (_verify(_message, _sign, _msgSender())) {
      revert Dochain__VerifyFailed();
    }
    return true;
  }

  // add role for visitor
  function addRolevisitor(address _newlawyerVisitor)
    public
    onlyRole(ROL_ADMIN)
  {
    _grantRole(ROL_VISITOR, _newlawyerVisitor);
    emit AddRole(_newlawyerVisitor);
  }

  // delete role
  function deleteRoleVisit(address _lawyerVisitor) public onlyRole(ROL_ADMIN) {
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

  /**
   * Apply function Pausable
   */
  function pause() public onlyRole(ROL_ADMIN) {
    _pause();
  }

  function unpause() public onlyRole(ROL_ADMIN) {
    _unpause();
  }
}
