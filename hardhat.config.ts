import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import("@nomiclabs/hardhat-etherscan")
import("hardhat-gas-reporter")
import "solidity-coverage"
import "@typechain/hardhat"
import "@nomiclabs/hardhat-ethers"
import "dotenv/config"
import "hardhat-deploy"
require("@nomicfoundation/hardhat-chai-matchers")

const { GOERLI_RPC_URL: GOERLI_RPC_URL, 
        PRIVATE_KEY: PRIVATE_KEY,
        ETHERSCAN_API_KEY:ETHERSCAN_API_KEY,
        COINMARKETCAP_API_KEY:COINMARKETCAP_API_KEY,
        REPORT_GAS: REPORT_GAS } = process.env

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337
    },
    localhost:{
      chainId: 31337
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      chainId: 5,
    },
  },
  solidity: "0.8.7",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt",
    currency: "USD",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    },
    lawyerAdmin: {
      default: 1,
    },
    lawyerVisit: {
      default: 2
    }
  },
  mocha: {
    timeout: 200000,
  }
}

export default config
