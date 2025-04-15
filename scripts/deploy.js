const hre = require("hardhat");

async function main() {
  console.log("Starting deployment...");

  // Get the contract factory with the correct case
  const Upload = await hre.ethers.getContractFactory("Upload");
  console.log("Contract factory created...");

  // Deploy the contract
  const upload = await Upload.deploy();
  console.log("Waiting for deployment...");

  // Wait for the contract to be deployed
  await upload.waitForDeployment();

  // Get the contract address
  const address = await upload.getAddress();
  console.log("Upload contract deployed to:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });