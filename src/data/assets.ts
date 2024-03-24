export type Asset = {
  label: string;
  value: number;
  chainId: bigint | string;
  iconImage: string;
  networkImage: string;
  networkTooltip: string;
  code: string;
};

const assets: Asset[] = [
  {
    label: 'ETH sepolia',
    value: 60,
    chainId: BigInt('11155111'),
    iconImage: '/images/eth.png',
    networkImage: '/images/eth-alt.png',
    networkTooltip: 'Ethereum Network',
    code: 'ETH',
  },
  {
    label: 'BNB testnet',
    value: 60,
    chainId: BigInt('97'),
    iconImage: '/images/bnb.png',
    networkImage: '/images/bsc.png',
    networkTooltip: 'BNB Smart Chain',
    code: 'BNB',
  },
  {
    label: 'BTC testnet',
    value: 0,
    chainId: 'testnet',
    iconImage: '/images/btc.png',
    networkImage: '/images/btc-alt.png',
    networkTooltip: 'Bitcoin Network',
    code: 'BTC',
  },
  // {
  //   label: 'ETH mainnet',
  //   value: 60,
  //   chainId: 1,
  //   iconImage: '/images/eth.png',
  //   networkImage: '/images/eth-alt.png',
  //   networkTooltip: 'Ethereum Network',
  //   code: 'ETH',
  // },
  // {
  //   label: 'BTC mainnet',
  //   value: 0,
  //   iconImage: '/images/btc.png',
  //   networkImage: '/images/btc-alt.png',
  //   networkTooltip: 'Bitcoin Network',
  //   code: 'BTC',
  // },
  // {
  //   label: 'BNB mainnet',
  //   value: 60,
  //   chainId: 56,
  //   iconImage: '/images/bnb.png',
  //   networkImage: '/images/bsc.png',
  //   networkTooltip: 'BNB Smart Chain',
  //   code: 'BNB',
  // },
];

export default assets;
