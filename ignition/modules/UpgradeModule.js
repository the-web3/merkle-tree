const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const  proxyModule = require("./ProxyModule");


const UpgradeModule = buildModule("UpgradeModule", (m) => {
    const proxyAdminOwner = m.getAccount(0);

    const { proxyAdmin, proxy } = m.useModule(proxyModule);

    const ardropManagerV2 = m.contract("AirdropManagerV2");

    const encodedFunctionCall = m.encodeFunctionCall(ardropManagerV2, "setVersion", [
        2,
    ]);

    m.call(proxyAdmin, "upgradeAndCall", [proxy, ardropManagerV2, encodedFunctionCall], {
        from: proxyAdminOwner,
    });

    return { proxyAdmin, proxy };
});

module.exports = UpgradeModule;
