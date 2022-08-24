import { ethers, network ,run} from "hardhat"

async function main(){
  const DochainFactory = await ethers.getContractFactory("Dochain")
  console.log("Deploying contract . . .")
  const [adminLayer, layerVisit] = await ethers.getSigners();
  const Dochain = await DochainFactory.deploy(adminLayer.address,layerVisit.address)
  await Dochain.deployed()


  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await Dochain.deployTransaction.wait(6);
    await verify(Dochain.address, []);
  }
  console.log(`Dochain is deployed to: ${Dochain.address}`)

  let value:string = await Dochain.readDocumentation()
  console.log(`The Key is ${value}`)
}

const verify = async (ContractAddress: string, args: any[]) => {
  console.log("Verify contract");
  try {
    await run("verify:verify", {
      address: ContractAddress,
      constuctorArguments: args,
    });
  } catch(e:any) {
    if(e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!")
    } else {
      console.log(e)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })