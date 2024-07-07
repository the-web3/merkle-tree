const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const  proxyModule = require("./ProxyModule");

const MerkleTreeModule = buildModule("MerkleTreeModule", (m) => {
    const { proxyAdmin, proxy } = m.useModule(proxyModule);

    const airdrop = m.contractAt("AirdropManager", proxy);

    return { airdrop, proxy, proxyAdmin };
});

module.exports = MerkleTreeModule;
