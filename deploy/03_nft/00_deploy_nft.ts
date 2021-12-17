import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {
    deployments,
    ethers,
    upgrades: {deployProxy},
  } = hre;
  const NFTMarket = await deployments.get('NFTMarket');
  const NFT = await ethers.getContractFactory('NFT');
  await deployProxy(NFT, [NFTMarket.address], {unsafeAllowCustomTypes: true});
};
export default func;
