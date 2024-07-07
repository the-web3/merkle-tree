import {ignition} from "hardhat";

const { expect } = require("chai");
const ProxyModule  = require("/ignition/modules/ProxyModule");
const UpgradeModule = require("/ignition/modules/UpgradeModule");

describe("AirdropManager Proxy", function () {
  describe("Proxy interaction", async function () {
    it("Should be interactable via proxy", async function () {
      const [, otherAccount] = await ethers.getSigners();
      const { airdrop } = await ignition.deploy(ProxyModule);
      expect(await airdrop.connect(otherAccount).version()).to.equal(1);
    });
  });

  describe("Upgrading", function () {
    it("Should have upgraded the proxy to DemoV2", async function () {
      const [, otherAccount] = await ethers.getSigners();
      const { airdropV2 } = await ignition.deploy(UpgradeModule);
      expect(await airdropV2.connect(otherAccount).version()).to.equal(2);
    });

    it("Should have set the name during upgrade", async function () {
      const [, otherAccount] = await ethers.getSigners();
      const { airdropV2 } = await ignition.deploy(UpgradeModule);
      expect(await airdropV2.connect(otherAccount).name()).to.equal(2);
    });
  });
});


