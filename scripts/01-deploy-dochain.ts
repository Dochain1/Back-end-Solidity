import { ethers, network } from "hardhat"
import verify from "../utils/verify"
import { hash ,keyPublicAdmin, keyPublicVisit}  from "../utils/message";

async function deployContract() {
  const DochainFactory = await ethers.getContractFactory("Dochain")
  console.log("Deploying contract . . .")
  const [lawyerAdmin] = await ethers.getSigners()
  const lawyerVisit = lawyerAdmin;
  let message = await hash(lawyerVisit)
  
  
  const args: any[] = [
    keyPublicAdmin,
    keyPublicVisit,
    message  
  ]
  

  const Dochain = await DochainFactory.deploy(
    keyPublicAdmin,
    keyPublicVisit,
    message
  )

  await Dochain.deployed()
  

  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await Dochain.deployTransaction.wait(3)
    await verify(Dochain.address, args)
  }
  console.log(`Dochain is deployed to: ${Dochain.address}`)
  
  return Dochain
}


deployContract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

export default deployContract;