import { task } from 'hardhat/config';

type ContractName =
  | 'NFTDescriptor'
  | 'NounsDescriptor'
  | 'NounsSeeder'
  | 'NounsToken'
  | 'NounsAuctionHouse'
  | 'NounsAuctionHouseProxyAdmin'
  | 'NounsDAOExecutor'
  | 'NounsDAOLogicV1'
  | 'NounsDAOProxy'
  | 'NounsAuctionHouseProxy';

interface VerifyArgs {
  address: string;
  constructorArguments?: (string | number)[];
  libraries?: Record<string, string>;
}

const contracts: Record<ContractName, VerifyArgs> = {
  NFTDescriptor: {
    address: '0x1963A4B2D6F4A033739a697282B49b951E448aB6',
  },
  NounsDescriptor: {
    address: '0xa70f75aE8bc029E3d6Bc1cA9f5627614e93F988f',
    libraries: {
      NFTDescriptor: '0x1963A4B2D6F4A033739a697282B49b951E448aB6',
    },
  },
  NounsSeeder: {
    address: '0xDa8Fdb4E01aFd6633fE5C093F89537a23481871b',
  },
  NounsToken: {
    address: '0xDBC86941A6AcBdfFf8fF5798338Ff40033325A3E',
    constructorArguments: [
      '0xaC0FBE371731021779d74b486772aaCf78A01De8', // noundersdao
      '0xB2AF4E3FF73CfdE0c139522b0F0CBF57b49939cF', // expectedAuctionHouseProxyAddress
      '0xa70f75aE8bc029E3d6Bc1cA9f5627614e93F988f',
      '0xDa8Fdb4E01aFd6633fE5C093F89537a23481871b',
      '0xf57b2c51ded3a29e6891aba85459d600256cf317', // proxyRegistryAddress
    ],
  },
  NounsAuctionHouse: {
    address: '0x184c2afC9Bc1032cC3FF18dB6b8E158F08aE84f3',
  },
  NounsAuctionHouseProxyAdmin: {
    address: '0xbD330C029ad2E6dC25CEe72d59C0Dc46F67b4953',
  },
  NounsAuctionHouseProxy: {
    address: '0xB2AF4E3FF73CfdE0c139522b0F0CBF57b49939cF',
    constructorArguments: [
      '0x184c2afC9Bc1032cC3FF18dB6b8E158F08aE84f3',
      '0xbD330C029ad2E6dC25CEe72d59C0Dc46F67b4953',
      '0x87f49f54000000000000000000000000DBC86941A6AcBdfFf8fF5798338Ff40033325A3E000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000000000000000012c00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000001518',
    ],
  },
  NounsDAOExecutor: {
    address: '0xbE0d7837caf124B716890843546579BDF0FeA63E',
    constructorArguments: ['0x9132C164FDcDD91CFb7DE28682749ef7dC449cb5', 172800],
  },
  NounsDAOLogicV1: {
    address: '0x9491e1d24043a029CF6085BF28cb95D565465e4b',
  },
  NounsDAOProxy: {
    address: '0x9132C164FDcDD91CFb7DE28682749ef7dC449cb5',
    constructorArguments: [
      '0xbE0d7837caf124B716890843546579BDF0FeA63E',
      '0xDBC86941A6AcBdfFf8fF5798338Ff40033325A3E',
      '0xaC0FBE371731021779d74b486772aaCf78A01De8', // noundersdao
      '0xbE0d7837caf124B716890843546579BDF0FeA63E',
      '0x9491e1d24043a029CF6085BF28cb95D565465e4b',
      19710,
      13140,
      500,
      1000,
    ],
  },
};

task('verify-etherscan', 'Verify the Solidity contracts on Etherscan').setAction(async (_, hre) => {
  for (const [name, args] of Object.entries(contracts)) {
    console.log(`verifying ${name}...`);
    try {
      await hre.run('verify:verify', {
        ...args,
      });
    } catch (e) {
      console.error(e);
    }
  }
});
