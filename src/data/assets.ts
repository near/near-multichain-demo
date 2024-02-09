const assets = [
  {
    label: 'ETH',
    value: 'eth',
    iconImage: '/images/ETH.png',
    networkImage: '/images/ETH-network.png',
  },
  {
    label: 'BTC',
    value: 'btc',
    iconImage: '/images/BTC.png',
    networkImage: '/images/BTC-network.png',
  },
  {
    label: 'BNB',
    value: 'bnb',
    iconImage: '/images/BNB.png',
    networkImage: '/images/BSC.png',
  },
];

export const associatedNetwork: Record<string, string> = {
  eth: 'Ethereum Testnet Network',
  btc: 'Bitcoin network',
  bnb: 'Binance Smart Chain network',
};

export default assets;
