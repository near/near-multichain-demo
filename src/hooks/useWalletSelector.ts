import { NetworkId, setupWalletSelector } from '@near-wallet-selector/core';
import { setupFastAuthWallet } from 'near-fastauth-wallet';

export default () =>
  setupWalletSelector({
    network: process.env.VITE_NETWORK_ID as NetworkId,
    modules: [
      setupFastAuthWallet({
        relayerUrl:
          process.env.VITE_NETWORK_ID === 'testnet'
            ? 'http://34.70.226.83:3030/relay'
            : 'https://near-relayer-mainnet.api.pagoda.co/relay',
      }),
    ],
  });
