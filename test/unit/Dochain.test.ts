import { assert, expect } from "chai"
const { ethers , network} = require("hardhat")
import { Dochain__factory } from "../../typechain-types/factories/contracts/Dochain__factory"
import { Dochain } from "../../typechain-types/contracts/Dochain"
import { hash}  from "../../utils/message";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"


describe("Dochain", function () {
  let dochain: Dochain
  let dochainInteract : Dochain
  let DochainFactory: Dochain__factory
  let accounts: SignerWithAddress[]
  let interval:number
  let lawyerAdmin: SignerWithAddress
  let lawyerVisit: SignerWithAddress

  beforeEach(async () => {
    DochainFactory = (await ethers.getContractFactory(
      "Dochain"
    )) as Dochain__factory
    accounts = await ethers.getSigners()
    lawyerVisit = accounts[2]
    lawyerAdmin = accounts[1]
    const keyPublicAdmin =[accounts[0].address,lawyerAdmin.address] 
    const keyPublicVisit =[lawyerVisit.address]
    interval = 86400;
    let message: string = await hash(lawyerVisit)
    

    dochain = await DochainFactory.deploy(
    keyPublicAdmin,
    keyPublicVisit,
    message
    )
    await dochain.deployed() 
    dochainInteract = dochain.connect(lawyerVisit)
  })
  describe("constructor", function () {
    it("checking the interval", async function () {
        const intervalValue = (await dochain.getInterval()).toString()
        assert.equal(intervalValue, "86400")
    })
    it("lastTimeStam", async function() {
        expect(await dochain.getlastTimeStamp()).to.above(0);
    })

  })
  describe("EnterNewHash", function() {
    it("Insert new hash", async() => {
        await dochain.setNewHash("0x")
        const actualHash = (await dochain.getActualHash()).toString()
        const expectNewHash = (await dochain.getNewHash()).toString()
        assert.notEqual(expectNewHash, actualHash)
    })
    it("Revert cause is not the admin", async() => {
        await expect(dochainInteract.setNewHash("0x898123")).reverted;
    })
  })
  describe("checkUpkeep", function() {
    it("return false if enough time hasn't passed", async()=> {
        await dochain.setNewHash("00000x")
        await network.provider.send("evm_increaseTime", [interval - 200])
        await network.provider.request({method: "evm_mine", params: []})
        const { upkeepNeeded} = await dochain.callStatic.checkUpkeep("0x")
        assert(!upkeepNeeded)
    })
    it("return false if no new hash", async() => {
        await network.provider.send("evm_increaseTime", [interval + 1])
        await network.provider.request({ method: "evm_mine", params: [] })
        const { upkeepNeeded} = await dochain.callStatic.checkUpkeep("0x")
        assert(!upkeepNeeded) 
    })
    it("return true if enough time has passed and they have new hash", async() => {
        await dochain.setNewHash("000000x")
        await network.provider.send("evm_increaseTime", [interval + 1])
        await network.provider.request({method: "evm_mine", params: []})
        const { upkeepNeeded} = await dochain.callStatic.checkUpkeep("0x")
        assert(upkeepNeeded)
    })
  })
  describe("performUpkeep", function() {
    it("Can only run if checkupkeep is true", async() => {
        await dochainInteract.safeMint(lawyerVisit.address)
        await network.provider.send("evm_increaseTime",[interval + 1])
        await network.provider.request({method: "evm_mine",params: []})
        const tx = await dochainInteract.performUpkeep("0x")
        assert(tx)
    })
  })

  describe("Verify",function (){
    it("return true if the lawyer visit  sign the message", async()=>{
        let sig = await hash(lawyerVisit)
        const message_ipfs = ethers.utils.toUtf8Bytes("https://gateway.pinata.cloud/ipfs/QmUTPbs79BgYNmHJSsQrEhawE7mCYtvnv99bqbz911Y54k") 
        const message = ethers.utils.keccak256(message_ipfs)
        const result:boolean = await dochainInteract.readDocumentation(message,sig)
        assert(result)
    })
  })
})