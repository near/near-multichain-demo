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

interface BaseSendMultichainMessage {
  chain: number;
  domain?: string;
  to: string;
  value: bigint;
  meta?: { [k: string]: any };
  from: string;
}

type EvmSendMultichainMessage = BaseSendMultichainMessage & {
  chainId: bigint;
  maxFeePerGas?: bigint;
  maxPriorityFeePerGas?: bigint;
  gasLimit?: number;
};

type BTCSendMultichainMessage = BaseSendMultichainMessage & {
  network: 'mainnet' | 'testnet';
};

export type SendMultichainMessage =
  | BTCSendMultichainMessage
  | EvmSendMultichainMessage;

interface AuthContextType {
  accountId: string | null;
  requestAuthentication: (createAccount?: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  deriveAddress: (args: DerivedAddressParam) => Promise<string>;
  sendTransaction: (data: SendMultichainMessage) => Promise<void>;
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
          ? 'https://corsproxy.io/?https://34.70.226.83:3030/relay'
          : 'https://near-relayer-mainnet.api.pagoda.co/relay';

      const selector = await setupWalletSelector({
        network: networkId,
        modules: [
          setupFastAuthWallet({
            relayerUrl,
          }),
        ],
      });

      const fastAuthInstance = await selector.wallet('fast-auth-wallet');
      setFastAuthWallet(fastAuthInstance);
    }

    init();
  }, []);

  const getAccountId = useCallback(async (): Promise<string | null> => {
    if (!fastAuthWallet) {
      console.error('FastAuth wallet not available');
      return null;
    }

    const accounts = await fastAuthWallet.getAccounts();
    return accounts[0]?.accountId || null;
  }, [fastAuthWallet]);

  const signOut = useCallback(async (): Promise<void> => {
    if (!fastAuthWallet) {
      console.error('FastAuth wallet not available');
      return;
    }

    await fastAuthWallet.signOut();

    window.location.pathname = '/';
  }, [fastAuthWallet]);

  const requestAuthentication = useCallback(
    async (createAccount = false): Promise<void> => {
      if (!fastAuthWallet) {
        console.error('FastAuth wallet not available');
        return;
      }

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
      if (!fastAuthWallet) {
        console.error('FastAuth wallet not available');
        return;
      }

      return fastAuthWallet.getDerivedAddress(args);
    },
    [fastAuthWallet]
  );

  const sendTransaction = useCallback(
    async (data: SendMultichainMessage) => {
      if (!fastAuthWallet) {
        console.error('FastAuth wallet not available');
        return;
      }

      return fastAuthWallet.signMultiChainTransaction(data);
    },
    [fastAuthWallet]
  );

  useEffect(() => {
    const fetchAccountId = async () => {
      try {
        const accountId = await getAccountId();
        setAccountId(accountId);
      } catch (e) {
        console.error(e);
      }
    };

    fetchAccountId();
  }, [getAccountId]);

  return (
    <AuthContext.Provider
      value={{
        accountId,
        requestAuthentication,
        signOut,
        deriveAddress,
        sendTransaction,
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
