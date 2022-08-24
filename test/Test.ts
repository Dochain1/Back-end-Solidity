import { expect } from "chai";
import { ethers } from "hardhat";
import { Dochain__factory } from "../typechain-types/factories/contracts/Dochain__factory"
import { Dochain } from "../typechain-types/contracts/Dochain";

describe("Dochain", function () {
    let dochain: Dochain;
    let DochainFactory: Dochain__factory;
    beforeEach(async() => {
        DochainFactory = (await ethers.getContractFactory("Dochain")) as Dochain__factory;
        const [adminLayer, layerVisit] = await ethers.getSigners();
        dochain = await DochainFactory.deploy(adminLayer.address,layerVisit.address)
        
    });
    it("checking the hash", async function () {
        let expectValue:string = "0x50dcd166c37f57c44f54074a8dabff23f3ee602c20ac8db4242a813c26c464cd";
        let currentValue:string = await dochain.readDocumentation()
        expect(expectValue).to.equal(currentValue)
    })  
})