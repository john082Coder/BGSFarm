var fs = require('fs');
const { ethers } = require('hardhat');



const configs = require("../config.json");
const contracts = require("../contracts.json");
async function main() {
  try {
    

  const masterChefFactory = await ethers.getContractFactory('Farm');
  const BGS = await ethers.getContractFactory('BattleofGuardiansShareToken');
  const currentBlock = await web3.eth.getBlockNumber();
  const startBlock = configs.farm_param.startBlock
  || web3.utils.toBN(currentBlock).add(web3.utils.toBN(configs.farm_param.delay));
  console.log("currentBlock", startBlock.toString())
  let dataParse = contracts;

   
    const masterchef = await (await masterChefFactory.deploy("0x9b3fcE3e0D7d13775910d9148DbBe7730353907d",web3.utils.toBN(configs.farm_param.rewardPerBlock).toString() ,startBlock.toString() )).deployed();
    console.log("MasterChef is deployed at: ", masterchef.address);
    if (configs.farm_param.fund) {
   //   const BGSInstance = await  hre.ethers.getContractAt("BattleofGuardiansShareToken", dataParse['BGS']);
   //   await BGSInstance.approve(masterchef.address, 12);
   //   await BGSInstance.fund(web3.utils.toBN(configs.farm_param.fund).toString());
    }

    const re = await  hre.run("verify:verify", {address:masterchef.address, constructorArguments: ["0x9b3fcE3e0D7d13775910d9148DbBe7730353907d",web3.utils.toBN(configs.farm_param.rewardPerBlock).toString() ,startBlock.toString()]});
    console.log(re);
    const updatedData = JSON.stringify(dataParse);
		await fs.promises.writeFile('contracts.json', updatedData);

  } catch (error) {
    console.log(error);
  }
};

main()
	.then(() => process.exit(0))
	.catch(error => {
			console.error(error);
			process.exit(1);
	});
