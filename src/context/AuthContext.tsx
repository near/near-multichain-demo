import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupFastAuthWallet, FastAuthWallet } from 'near-fastauth-wallet';
import React, { createContext, useContext, useEffect, useState } from 'react';

const networkId = (import.meta as any).env.VITE_NETWORK_ID || 'testnet';

type FastAuthWalletInterface = Awaited<ReturnType<typeof FastAuthWallet>>;

interface AuthContextType {
  fastAuthWallet: FastAuthWalletInterface | null;
  signedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [fastAuthWallet, setFastAuthWallet] =
    useState<FastAuthWalletInterface | null>(null);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    async function init() {
      const relayerUrl =
        networkId === 'testnet'
          ? 'https://corsproxy.io/?http://localhost:3030/relay'
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
      // Using any because the selector exposes the NEP wallet interface that cannot be cast to the current FastAuthWallet interface
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setFastAuthWallet(fastAuthInstance as any);
    }

    init();
  }, []);

  useEffect(() => {
    const fetchAccountId = async () => {
      try {
        if (!fastAuthWallet) {
          console.error('FastAuth wallet not available');
          return;
        }

        const accounts = await fastAuthWallet.getAccounts();
        const accountId = accounts[0]?.accountId || null;
        setSignedIn(!!accountId); // Update signedIn state based on accountId
      } catch (e) {
        console.error(e);
      }
    };

    fetchAccountId();
  }, [fastAuthWallet]);

  return (
    <AuthContext.Provider
      value={{
        fastAuthWallet,
        signedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
