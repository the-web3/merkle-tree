
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const ProxyModule = buildModule("ProxyModule", (m) => {

    const tokenAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
    const merkleRoot = "0xb5bdb302fe9f85e9a8e68307025b8ac8ab875b6ddf3222b5acc8d9085f0515a7";

    const proxyAdminOwner = m.getAccount(0);

    const airdropContracts = m.contract("AirdropManager");

    const proxy = m.contract("MtProxy", [
          airdropContracts,
          proxyAdminOwner,
          "0x",
    ]);

    const proxyAdminAddress = m.readEventArgument(
        proxy,
        "AdminChanged",
        "newAdmin"
    );
    const proxyAdmin = m.contractAt("ProxyAdmin", proxyAdminAddress);

    return { proxyAdmin, proxy };
});

module.exports = ProxyModule;
