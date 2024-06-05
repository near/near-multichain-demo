import { Chain, CovalentClient } from '@covalenthq/client-sdk';
import { validate as isValidBtcAddress } from 'bitcoin-address-validation';
import { useState, useEffect, useCallback } from 'react';

import { fromSatoshis, fromWei } from '@/utils/asset';

const COVALENT_API_KEY = (import.meta as any).env.VITE_COVALENT_API_KEY;

export function isValidEvmAddress(address: string): boolean {
  // EVM-compatible address validation (Ethereum, BSC, etc.)
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}
async function fetchBtcTestnetBalance(address: string): Promise<number> {
  const response = await fetch(
    `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch balance: ${response.statusText}`);
  }
  const data = await response.json();

  if (!Number.isInteger(data.balance)) {
    throw new Error(`Balance not available`);
  }
  // type: BlockCypherBalanceResponse
  return fromSatoshis(data.balance);
}

async function fetchCovalentBalance(
  address: string,
  chain: Chain
): Promise<number> {
  const client = new CovalentClient(COVALENT_API_KEY);
  const response = await client.BalanceService.getTokenBalancesForWalletAddress(
    chain,
    address
  );

  if (response.error) {
    throw new Error(`Failed to fetch balance: ${response.error_message}`);
  }

  const { balance } = response.data.items[0];
  if (balance === null) return 0;
  // type: Response<BalancesResponse>
  return chain.includes('btc')
    ? fromSatoshis(BigInt(balance).toString())
    : fromWei(BigInt(balance).toString());
}

const useFetchTokenBalance = (address: string, chain: string) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const validateAddress = (address: string, chain: string): boolean => {
    if (chain === 'btc-testnet' || chain.includes('btc')) {
      return isValidBtcAddress(address);
    } else if (chain.includes('eth') || chain.includes('bsc')) {
      return isValidEvmAddress(address);
    }
    return false; // Add other chains as needed
  };

  const fetchTokenBalance = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let fetchedBalance;
      if (chain === 'btc-testnet') {
        fetchedBalance = await fetchBtcTestnetBalance(address);
      } else {
        fetchedBalance = await fetchCovalentBalance(address, chain as Chain);
      }
      setBalance(fetchedBalance);
      setError(null);
    } catch (error: any) {
      console.error('Error fetching balance:', error);
      setError(error.message || 'Failed to fetch balance');
    } finally {
      setLoading(false);
    }
  }, [address, chain]);

  useEffect(() => {
    if (!validateAddress(address, chain)) {
      return;
    }
    fetchTokenBalance();
  }, [address, fetchTokenBalance, chain]);

  return { balance, loading, error, refetch: fetchTokenBalance };
};

export default useFetchTokenBalance;
