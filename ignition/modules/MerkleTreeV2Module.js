const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const  upgradeModule = require("./upgradeModule");

const MerkleTreeV2Module = buildModule("MerkleTreeV2Module", (m) => {
    const { proxy } = m.useModule(upgradeModule);

    const airdropManagerV2 = m.contractAt("AirdropManagerV2", proxy);

    return { airdropManagerV2 };
});

module.exports = MerkleTreeV2Module;
