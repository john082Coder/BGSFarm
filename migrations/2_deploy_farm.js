var fs = require('fs');

var Farm = artifacts.require("../contracts/Farm.sol");

const configs = require("../config.json");
const contracts = require("../contracts.json");

module.exports = async function(deployer) {
  try {
    let dataParse = contracts;

    if (configs.lpExist) {
      if (!configs.Farm) {
        const currentBlock = await web3.eth.getBlockNumber();
        const startBlock = configs.farm_param.startBlock
            || web3.utils.toBN(currentBlock).add(web3.utils.toBN(configs.farm_param.delay));

        await deployer.deploy(Farm, "0x9b3fcE3e0D7d13775910d9148DbBe7730353907d", web3.utils.toBN(configs.farm_param.rewardPerBlock), startBlock );
        const farmInstance = await Farm.deployed();
        dataParse['Farm'] = Farm.address;
        if (configs.farm_param.fund) {
          const BGSInstance = await BGS.at(dataParse['BGS']);
          await BGSInstance.approve(Farm.address, web3.utils.toBN(configs.farm_param.fund));
      //    await BGSInstance.fund(web3.utils.toBN(configs.farm_param.fund));
        }
        for (let i = 0; i < configs.farm_param.lp.length; i ++) {
          const token = configs.farm_param.lp[i];
          if (token.address) {
            await farmInstance.add(
              token.allocPoint,
              token.address,
              false
            );
          }
        }
      }
      else {
        dataParse['Farm'] = configs.Farm;
      }      
    }

    const updatedData = JSON.stringify(dataParse);
		await fs.promises.writeFile('contracts.json', updatedData);

  } catch (error) {
    console.log(error);
  }

};
