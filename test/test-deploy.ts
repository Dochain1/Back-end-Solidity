import { expect } from "chai"
const { ethers } = require("hardhat")
import { Dochain__factory } from "../typechain-types/factories/contracts/Dochain__factory"
import { Dochain } from "../typechain-types/contracts/Dochain"

describe("Dochain", function () {
  let dochain: Dochain
  let DochainFactory: Dochain__factory
  beforeEach(async () => {
    DochainFactory = (await ethers.getContractFactory(
      "Dochain"
    )) as Dochain__factory
    
  })
  it("checking the hash", async function () {
    const [adminlawyer, lawyerVisit] = await ethers.getSigners()
    const interval = 200;
    let hash: string =
      "0x50dcd166c37f57c44f54074a8dabff23f3ee602c20ac8db4242a813c26c464cd"
    const sig = await adminlawyer.signMessage(hash)
    dochain = await DochainFactory.deploy(
      adminlawyer.address,
      lawyerVisit.address,
      interval,
      sig
    )
    
    

    let currentValue: boolean = await dochain.readDocumentation(hash,sig)
    expect(currentValue).to.equal(true)
  })
})
