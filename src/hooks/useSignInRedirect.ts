import {
  setupWalletSelector,
  WalletSelector,
} from '@near-wallet-selector/core';
import { setupFastAuthWallet } from 'near-fastauth-wallet';
import { useCallback, useEffect, useState } from 'react';

const networkId = (import.meta as any).env.VITE_NETWORK_ID;

export function useSignInRedirect() {
  const [selectorInstance, setSelectorInstance] = useState<WalletSelector>();

  useEffect(() => {
    const init = async () => {
      const selectorInstance = await setupWalletSelector({
        network: networkId,
        modules: [
          setupFastAuthWallet({
            relayerUrl:
              networkId === 'testnet'
                ? 'https://corsproxy.io/?https://near-relayer-testnet.api.pagoda.co/relay'
                : 'https://near-relayer-mainnet.api.pagoda.co/relay',
            walletUrl: 'http://localhost:3000',
          }),
        ],
      });
      setSelectorInstance(selectorInstance);
    };

    init();
  }, []);

  const getAccountId = async () => {
    if (!selectorInstance) return;

    const fastAuthWallet = (await selectorInstance.wallet(
      'fast-auth-wallet'
    )) as any;

    const { accountId } = (await fastAuthWallet.getAccounts())[0];

    return accountId;
  };

  const signOut = async () => {
    if (!selectorInstance) return;

    const fastAuthWallet = (await selectorInstance.wallet(
      'fast-auth-wallet'
    )) as any;

    return fastAuthWallet.signOut();
  };

  const requestAuthentication = useCallback(
    async (createAccount = false) => {
      if (!selectorInstance) return;

      try {
        const fastAuthWallet = (await selectorInstance.wallet(
          'fast-auth-wallet'
        )) as any;
        await fastAuthWallet.signIn({
          contractId: 'near-social',
          isRecovery: !createAccount,
        });
      } catch (error) {
        console.error('Error during authentication:', error);
      }
    },
    [selectorInstance]
  );

  return {
    requestAuthentication,
    getAccountId,
    signOut,
  };
}
