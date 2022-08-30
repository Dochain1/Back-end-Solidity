import { ethers, network } from "hardhat"
import verify from "../utils/verify"
import { hash ,keyPublicAdmin, keyPublicVisit}  from "../utils/message";



async function main() {
  const DochainFactory = await ethers.getContractFactory("Dochain")
  console.log("Deploying contract . . .")
  const [lawyerAdmin] = await ethers.getSigners()
  const lawyerVisit = lawyerAdmin;
  const interval = 200;
  let message = await hash(lawyerVisit)
  
  
  const args: any[] = [
    keyPublicAdmin,
    keyPublicVisit,
    interval,
    message  
  ]
  

  const Dochain = await DochainFactory.deploy(
    keyPublicAdmin,
    keyPublicVisit,
    interval,
    message
  )

  await Dochain.deployed()

  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await Dochain.deployTransaction.wait(3)
    await verify(Dochain.address, args)
  }
  console.log(`Dochain is deployed to: ${Dochain.address}`)

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })