require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition-ethers");

module.exports = {
  solidity: {
    version: "0.8.24",
    paths: {
      sources: "./contracts",
      tests: "./test",
      cache: "./cache",
      artifacts: "./artifacts"
    },
    ignition: {
      modulePath: "./ignition/modules"
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/b48b6387e66d4f3497245873747f6e4d",
      accounts: ["f18b433b7f3d67a7458b612852b1ec1b10930b532546e9a7852425969d92ed2b"]
    },
    bsctest: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
      accounts: ["f18b433b7f3d67a7458b612852b1ec1b10930b532546e9a7852425969d92ed2b"]
    },
  },
  etherscan: {
    apiKey: "TNSTBJQHXQV8FJDC8BXEYCQXJP39TJ3U7U",
  }
};