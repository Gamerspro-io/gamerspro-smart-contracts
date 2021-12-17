import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  // const erc20Contract = await deployments.get('GPRT');

  await deploy('Land', {
    from: deployer,
    args: [
      // erc20Contract.address,
      '0x8b2f3c884c1dbc48ac2f8b3d6a4f63196e9a71c8',
      deployer, // set_land_admin set it later to correct address
    ],
    log: true,
    skipIfAlreadyDeployed: true,
  });
};
export default func;
func.tags = ['Land', 'Land_deploy'];
