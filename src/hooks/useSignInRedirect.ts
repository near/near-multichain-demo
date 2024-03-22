import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupFastAuthWallet } from 'near-fastauth-wallet';
import { useCallback } from 'react';

const networkId = import.meta.env.VITE_NETWORK_ID;

export function useSignInRedirect() {
  const requestAuthentication = useCallback(async (createAccount = false) => {
    const selector = setupWalletSelector({
      network: networkId,
      modules: [
        setupFastAuthWallet({
          relayerUrl:
            networkId === 'testnet'
              ? 'http://34.70.226.83:3030/relay'
              : 'https://near-relayer-mainnet.api.pagoda.co/relay',
        }),
      ],
    });

    if (!selector) return;

    try {
      const selectorInstance = await selector;
      const fastAuthWallet = await selectorInstance.wallet('fast-auth-wallet');
      await fastAuthWallet.signIn({
        contractId: 'near-social',
        isRecovery: !createAccount,
      });
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  }, []);

  return {
    requestAuthentication,
  };
}
