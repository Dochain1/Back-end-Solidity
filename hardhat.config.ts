import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import("@nomiclabs/hardhat-etherscan")
import("hardhat-gas-reporter")
import "solidity-coverage"
import "@typechain/hardhat"
import "@nomiclabs/hardhat-ethers"
import "dotenv/config"

const { GOERLI_RPC_URL: GOERLI_RPC_URL, 
        PRIVATE_KEY: PRIVATE_KEY,
        ETHERSCAN_API_KEY:ETHERSCAN_API_KEY,
        COINMARKETCAP_API_KEY:COINMARKETCAP_API_KEY } = process.env

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY!],
      chainId: 5,
    },
  },
  solidity: "0.8.7",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    currency: "USD",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
}

export default config
