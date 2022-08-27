import { ethers, network, run } from "hardhat"

async function main() {
  const DochainFactory = await ethers.getContractFactory("Dochain")
  console.log("Deploying contract . . .")
  const [adminlawyer, lawyerVisit] = await ethers.getSigners()
  const interval = 200;
  const hash ="https://gateway.pinata.cloud/ipfs/QmUTPbs79BgYNmHJSsQrEhawE7mCYtvnv99bqbz911Y54k"
  const message = await adminlawyer.signMessage(hash)
  

  const Dochain = await DochainFactory.deploy(
    adminlawyer.address,
    lawyerVisit.address,
    interval,
    message
  )

  await Dochain.deployed()

  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await Dochain.deployTransaction.wait(6)
    await verify(Dochain.address, [])
  }
  console.log(`Dochain is deployed to: ${Dochain.address}`)

  /**
   * Sing Document
   * bytes32 _message, bytes memory _sign)
   */
  // Tomar del json de ipfs y sacar el message

  // let value: boolean = await Dochain.readDocumentation(hash, sig)
  // console.log(`The Key is ${value}`)
}

const verify = async (ContractAddress: string, args: any[]) => {
  console.log("Verify contract")
  try {
    await run("verify:verify", {
      address: ContractAddress,
      constuctorArguments: args,
    })
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!")
    } else {
      console.log(e)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
