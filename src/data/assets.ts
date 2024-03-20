const assets = [
  {
    label: 'ETH',
    value: 'eth',
    iconImage: '/images/eth.png',
    networkImage: '/images/eth-alt.png',
    networkTooltip: 'Ropsten Ethereum Testnet',
  },
  {
    label: 'BTC',
    value: 'btc',
    iconImage: '/images/btc.png',
    networkImage: '/images/btc-alt.png',
    networkTooltip: 'Testnet3 Bitcoin Testnet',
  },
  {
    label: 'BNB',
    value: 'bnb',
    iconImage: '/images/bnb.png',
    networkImage: '/images/bsc.png',
    networkTooltip: 'Chapel BNB Chain Testnet',
  },
];

export const associatedNetwork: Record<string, string> = {
  eth: 'Ethereum Testnet Network',
  btc: 'Bitcoin network',
  bnb: 'Binance Smart Chain network',
};

export default assets;
