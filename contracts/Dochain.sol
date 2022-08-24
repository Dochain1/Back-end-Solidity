// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Dochain is AccessControl {
  // Role
  bytes32 public constant ROL_ADMIN = keccak256("ROL_ADMIN");
  bytes32 public constant ROL_VISITOR = keccak256("ROL_VISITOR");
  // Simulation of a hash
  bytes32 internal constant KEY = keccak256("This is a hash for IPFS");
  // Evento for add and delete role
  event AddRole(address indexed layer);
  event DeleteRole(address indexed layer);

  constructor(address _adminLayer, address _layerVisitor) {
    // Role assignment
    _grantRole(ROL_ADMIN, _msgSender());
    _grantRole(ROL_ADMIN, _adminLayer);
    _grantRole(ROL_VISITOR, _layerVisitor);
  }

  // Read key hash
  function readDocumentation()
    public
    view
    onlyRole(ROL_ADMIN)
    returns (bytes32)
  {
    return KEY;
  }

  // add role for visitor
  function addRolevisitor(address _newLayerVisitor) public onlyRole(ROL_ADMIN) {
    _grantRole(ROL_VISITOR, _newLayerVisitor);
    emit AddRole(_newLayerVisitor);
  }

  // delete role
  function deleteRoleVisit(address _layerVisitor) public onlyRole(ROL_ADMIN) {
    _revokeRole(ROL_VISITOR, _layerVisitor);
    emit DeleteRole(_layerVisitor);
  }
}
