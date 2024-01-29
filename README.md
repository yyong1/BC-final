# BC-final

# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

Deploy NFT commands:
``` shell
❯ npx hardhat run scripts/deployNFT.ts --network sepolia
❯ npx hardhat verify --network sepolia "NFT_deploy_address" "your_public_address" "MonsterToken_deploy_address"
```

Compile commands:
``` shell
❯ npx hardhat compile
``` 
