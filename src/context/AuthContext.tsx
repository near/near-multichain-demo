import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupFastAuthWallet } from 'near-fastauth-wallet';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const networkId = (import.meta as any).env.VITE_NETWORK_ID;

interface DerivedAddressParam {
  type: 'BTC' | 'EVM';
  signerId: string;
  path: string;
  networkId: 'testnet' | 'mainnet';
  btcNetworkId?: 'testnet' | 'mainnet';
  contract: 'multichain-testnet-2.testnet';
}

interface AuthContextType {
  accountId: string | null;
  requestAuthentication: (createAccount?: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  deriveAddress: (args: DerivedAddressParam) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accountId, setAccountId] = useState<string | null>(null);
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

  const deriveAddress = useCallback(
    (args: DerivedAddressParam) => {
      if (!fastAuthWallet) return;

      return fastAuthWallet.getDerivedAddress(args);
    },
    [fastAuthWallet]
  );

  useEffect(() => {
    const fetchAccountId = async () => {
      const accountId = await getAccountId();
      setAccountId(accountId);
    };

    fetchAccountId();
  }, [getAccountId]);

  return (
    <AuthContext.Provider
      value={{ accountId, requestAuthentication, signOut, deriveAddress }}
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
