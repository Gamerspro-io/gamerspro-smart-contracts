import 'dotenv/config';
import {HardhatUserConfig} from 'hardhat/types';
import 'hardhat-deploy';
import '@nomiclabs/hardhat-ethers'; // aliased to hardhat-deploy-ethers
import 'hardhat-gas-reporter';
import '@openzeppelin/hardhat-upgrades';
import 'solidity-coverage';
import 'hardhat-contract-sizer';
import '@nomiclabs/hardhat-etherscan';
import {accounts, node_url} from './utils/network';

const config: HardhatUserConfig = {
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    enabled: process.env.REPORT_GAS ? true : false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    maxMethodDiff: 10,
  },
  mocha: {
    timeout: 0,
  },
  solidity: {
    compilers: [
      {
        version: '0.8.2',
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
      {
        version: '0.7.5',
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
      {
        version: '0.6.5',
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
      {
        version: '0.5.9',
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
    ],
    overrides: {
      'src/solc_0.8/polygon/child/asset/PolygonAssetV2.sol': {
        version: '0.8.2',
        settings: {
          optimizer: {
            enabled: true,
            runs: 0,
          },
        },
      },
      'src/solc_0.8/asset/AssetV2.sol': {
        version: '0.8.2',
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 1,
      mainnet: '0x8B2F3c884C1DbC48AC2F8b3d6a4F63196e9A71C8',
      polygon: '0x8B2F3c884C1DbC48AC2F8b3d6a4F63196e9A71C8',
      rinkeby: '0x8B2F3c884C1DbC48AC2F8b3d6a4F63196e9A71C8',
      goerli: '0x8B2F3c884C1DbC48AC2F8b3d6a4F63196e9A71C8',
      mumbai: '0x8B2F3c884C1DbC48AC2F8b3d6a4F63196e9A71C8',
    },
  },
  networks: {
    /**
     * TAGS:
     *  - mainnet -> production networks
     *  - testnet -> non production networks
     *  - L1      -> Layer 1 networks
     *  - L2      -> Layer 2 networks
     */
    hardhat: {
      accounts: accounts(process.env.HARDHAT_FORK),
      tags: ['testnet', 'L1', 'L2'],
      forking: process.env.HARDHAT_FORK
        ? {
            url: node_url(process.env.HARDHAT_FORK),
            blockNumber: process.env.HARDHAT_FORK_NUMBER
              ? parseInt(process.env.HARDHAT_FORK_NUMBER)
              : undefined,
          }
        : undefined,
      deploy: ['deploy_polygon', 'deploy'],
      // deploy: ['deploy-for-test', 'deploy'],
    },
    localhost: {
      url: 'http://localhost:8545',
      accounts: accounts(),
      tags: ['testnet', 'L1', 'L2'],
    },
    rinkeby_test: {
      url: node_url('rinkeby'),
      accounts: accounts('rinkeby_test'),
      tags: ['testnet'],
    },
    rinkeby: {
      url: node_url('rinkeby'),
      accounts: accounts('rinkeby'),
      tags: ['testnet', 'L1'],
    },
    goerli: {
      url: node_url('goerli'),
      accounts: accounts('goerli'),
      tags: ['testnet', 'L1'],
      // gasPrice: 600000000000, // Uncomment in case of pending txs, and adjust gas
    },
    mainnet: {
      url: node_url('mainnet'),
      accounts: accounts('mainnet'),
      tags: ['mainnet', 'L1'],
    },
    mumbai: {
      url: node_url('mumbai'),
      accounts: accounts('mumbai'),
      tags: ['testnet', 'L2'],
      deploy: ['deploy_polygon'],
      gasPrice: 1000000000, // TODO: this fixes invalid sender issue
    },
    polygon: {
      url: node_url('polygon'),
      accounts: accounts('polygon'),
      tags: ['mainnet', 'L2'],
      deploy: ['deploy_polygon'],
      // gasPrice: 30000000000, // TODO: leaving it empty does not work
    },
  },
  paths: {
    sources: 'src',
  },
  contractSizer: {
    alphaSort: false,
    runOnCompile: false,
    disambiguatePaths: false,
  },

  external: process.env.HARDHAT_FORK
    ? {
        deployments: {
          hardhat: ['deployments/' + process.env.HARDHAT_FORK],
        },
      }
    : undefined,
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || '',
  },
};

export default config;
