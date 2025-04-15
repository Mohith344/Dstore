require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  paths: {
    sources: "./contracts", // Path to your contracts
    tests: "./contracts/test", // Path to your tests
    cache: "./cache",
    artifacts: "./client/src/artifacts",
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // Local Hardhat network
    },
  },
};