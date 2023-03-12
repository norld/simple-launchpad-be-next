"use strict";

/**
 * auto deployer service
 */

const ethers = require("ethers");
const moment = require("moment");
module.exports = ({ strapi }) => ({
  async deployFromFactory(launchpadId) {
    const launchpadData = await strapi.db
      .query("api::launchpad.launchpad")
      .findOne({
        where: {
          id: launchpadId,
        },
        populate: {
          tokenInfo: { populate: { chain: true } },
          currency: true,
        },
      });
    try {
      console.log(launchpadData.tokenInfo.chain);
      const provider = new ethers.providers.JsonRpcProvider(
        launchpadData.tokenInfo.chain.chainRPC
      );
      const privKey = process.env.PRIVATE_KEY;
      const signer = new ethers.Wallet(privKey, provider);
      const contractAddress = process.env.FACTORY_CONTRACT;
      const abi = strapi.config.get("factory");
      const contract = new ethers.Contract(contractAddress, abi.abi, signer);
      //TODO:
      const currentBlock = await provider.getBlockNumber();
      console.log("Current block", currentBlock);
      const currentBlockTimestamp = await (
        await provider.getBlock(currentBlock)
      ).timestamp;
      console.log("Current block timestamp", currentBlockTimestamp);
      const startTime = Math.floor(moment(launchpadData.launchDate).unix()); //inputan
      const endTime = Math.floor(moment(launchpadData.endDate).unix()); //inputan
      const param = [
        startTime,
        endTime - startTime,
        launchpadData.tokenInfo.tokenForPresale,
        launchpadData.tokenInfo.tokenAddress,
        launchpadData.currency.currencyAddress,
        launchpadData.txnRatio,
      ];

      console.log(param);

      const gasLimit = await contract.estimateGas.deployPool(...param);
      const tx = await contract.deployPool(...param, {
        gasLimit,
      });
      tx.wait();
      console.log(tx);
      await setTimeout(() => {}, 6000);
      const getTotalLaunchpad = await contract.getTotalLaunchpad();
      const getLaunchpadAddressByIndex =
        await contract.getLaunchpadAddressByIndex(
          parseInt(getTotalLaunchpad) - 1
        );

      await strapi.db.query("api::launchpad.launchpad").update({
        where: {
          id: launchpadData.id,
        },
        data: {
          poolAddress: getLaunchpadAddressByIndex,
          linkContract:
            launchpadData.tokenInfo.chain.chainBlockexplorer +
            "address/" +
            getLaunchpadAddressByIndex,
          deployed: true,
        },
      });
    } catch (err) {
      console.log("@err", err);
      await strapi.db.query("api::launchpad.launchpad").update({
        where: {
          id: launchpadData.id,
        },
        data: {
          verifiedAt: "",
        },
      });
    }
  },
});
