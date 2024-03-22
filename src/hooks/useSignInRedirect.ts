import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupFastAuthWallet } from 'near-fastauth-wallet';
import { useCallback, useEffect, useState } from 'react';

const networkId = (import.meta as any).env.VITE_NETWORK_ID;

export function useSignInRedirect() {
  const [fastAuthWallet, setFastAuthWallet] = useState<any | null>(null);

  useEffect(() => {
    async function init() {
      const relayerUrl =
        networkId === 'testnet'
          ? 'https://corsproxy.io/?https://near-relayer-testnet.api.pagoda.co/relay'
          : 'https://near-relayer-mainnet.api.pagoda.co/relay';

      const selector = await setupWalletSelector({
        network: networkId,
        modules: [
          setupFastAuthWallet({
            relayerUrl,
            walletUrl: 'http://localhost:3000',
          }),
        ],
      });

      const fastAuthInstance = await selector.wallet('fast-auth-wallet');
      setFastAuthWallet(fastAuthInstance);
    }

    init();
  }, []);

  const getAccountId = useCallback(async (): Promise<string | null> => {
    if (!fastAuthWallet) throw new Error('FastAuth wallet is not available.');

    const accounts = await fastAuthWallet.getAccounts();
    return accounts[0]?.accountId || null;
  }, [fastAuthWallet]);

  const signOut = useCallback(async (): Promise<void> => {
    if (!fastAuthWallet) return;

    return fastAuthWallet.signOut();
  }, [fastAuthWallet]);

  const requestAuthentication = useCallback(
    async (createAccount = false): Promise<void> => {
      if (!fastAuthWallet) return;

      try {
        await fastAuthWallet.signIn({
          contractId: 'near-social',
          isRecovery: !createAccount,
        });
      } catch (error) {
        console.error('Error during authentication:', error);
      }
    },
    [fastAuthWallet]
  );

  return { requestAuthentication, getAccountId, signOut };
}
