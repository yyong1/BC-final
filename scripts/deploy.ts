import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.parseEther("0.001");

  const lock = await ethers.deployContract("Lock", [unlockTime], {
    value: lockedAmount,
  });

  await lock.waitForDeployment();

  console.log(
    `Lock with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// import { ethers } from "hardhat";
// import { MonsterNFT } from "../typechain-types";
//
// async function main() {
//   const [deployer] = await ethers.getSigners();
//
//   console.log("Deploying contracts with the account:", deployer.address);
//
//   const monsterTokenAddress = "0xB5485b425e1E6153A72293e60F65543ed3118B3E";
//
//   const MonsterNFTFactory = await ethers.getContractFactory("MonsterNFT");
//
//   const monsterNFT = (await MonsterNFTFactory.deploy(
//       deployer.address, monsterTokenAddress
//   )) as MonsterNFT;
//
//   console.log("MonsterNFT deployed to address:", monsterNFT.target);
// }
//
// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//       console.error(error);
//       process.exit(1);
//     });
