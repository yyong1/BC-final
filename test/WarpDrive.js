const { expect } = require("chai");
const {ethers} = require("hardhat");

let instance;

describe("WarpDrive", function() {
    this.beforeEach(async function () {
        let Contract = await ethers.getContractFactory("WarpDrive")

        instance = await Contract.deploy()
    })

    it("should engage warp", async function() {
        const [owner] = await ethers.getSigners();

        expect(await instance.getWarpFactor()).to.equal(0)

        await expect(instance.engageWarp(6)).to.emit(instance, 'WarpEngaged').withArgs(6, owner.address)
        expect(await instance.getWarpFactor()).to.equal(6)
    })

    it("should only allow the pilot to engage warp", async function() {
        const [owner, address1] = await ethers.getSigners();

        let instance2 = instance.connect(address1)
        await expect(instance2.engageWarp(7)).to.be.revertedWith('Only the pilot can adjust the warp drive.')
    })

    it("should only allow proper warp drive parameters", async function() {
        const [owner] = await ethers.getSigners();

        await expect(instance.engageWarp(0)).to.be.revertedWith('The warp factor has to be between 0 and 10 (exclusive).')
        await expect(instance.engageWarp(10)).to.be.revertedWith('The warp factor has to be between 0 and 10 (exclusive).')

        await instance.engageWarp(8)
        await expect(instance.engageWarp(9)).to.be.revertedWith('Warp drive is already engaged!')
    })

    it("should disengage warp", async function() {
        const [owner] = await ethers.getSigners();
        expect(await instance.engageWarp(6))

        await expect(instance.disengageWarp()).to.emit(instance, 'WarpDisengaged').withArgs(owner.address)
        expect(await instance.getWarpFactor()).to.equal(0)

        await expect(instance.disengageWarp()).to.be.revertedWith('Warp drive is not engaged!')
    })

    it("should only allow the pilot to disengage warp", async function() {
        const [owner, address1] = await ethers.getSigners();
        expect(await instance.engageWarp(6))

        let instance2 = instance.connect(address1)
        await expect(instance2.disengageWarp()).to.be.revertedWith('Only the pilot can adjust the warp drive.')
    })

    it("should allow the pilot to assign a new pilot", async function() {
        const [owner, address1] = await ethers.getSigners();

        await expect(instance.changePilot(address1.address)).to.emit(instance, 'PilotChanged').withArgs(owner.address, address1.address)

        let instance2 = instance.connect(address1)
        await expect(instance2.engageWarp(7)).to.emit(instance, 'WarpEngaged').withArgs(7, address1.address)

        await expect(instance.engageWarp(7)).to.be.revertedWith('Only the pilot can adjust the warp drive.')
    })

    it("should allow the pilot to adjust warp", async function() {
        const [owner, address1] = await ethers.getSigners();

        await expect(instance.adjustWarpFactor(8)).to.be.revertedWith('Warp drive is not engaged!')

        await instance.engageWarp(7);

        await expect(instance.adjustWarpFactor(0)).to.be.revertedWith('The warp factor has to be between 0 and 10 (exclusive).')
        await expect(instance.adjustWarpFactor(10)).to.be.revertedWith('The warp factor has to be between 0 and 10 (exclusive).')

        await expect(instance.adjustWarpFactor(8)).to.emit(instance, 'WarpAdjusted').withArgs(8, owner.address)
        expect(await instance.getWarpFactor()).to.equal(8)

        let instance2 = instance.connect(address1)
        await expect(instance2.adjustWarpFactor(9)).to.be.revertedWith('Only the pilot can adjust the warp drive.')
    })
})