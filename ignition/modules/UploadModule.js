// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("UploadModule", (m) => {
  // Deploy the Upload contract
  const upload = m.contract("Upload");

  return { upload };
});