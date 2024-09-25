import { Chain, CovalentClient } from '@covalenthq/client-sdk';
import { validate as isValidBtcAddress } from 'bitcoin-address-validation';
import { useState, useEffect, useCallback } from 'react';
import { fromSatoshis, fromWei } from '@/utils/asset';

const COVALENT_API_KEY = (import.meta as any).env.VITE_COVALENT_API_KEY;

export function isValidEvmAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export async function fetchBtcTestnetBalance(address: string): Promise<number> {
  try {
    const response = await fetch(
      `https://blockstream.info/testnet/api/address/${address}/utxo`
    );
    const utxos = await response.json();
    const totalSatoshis = utxos.reduce(
      (acc: number, utxo: any) => acc + utxo.value,
      0
    );
    return totalSatoshis / 100000000; // Convert satoshis to BTC and format to 8 decimal places
  } catch (error) {
    console.error('Error fetching BTC balance:', error);
    return 0;
  }
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

  if (balance === null || typeof balance === 'undefined') {
    throw new Error(`Balance not available`);
  }
  return chain.includes('btc')
    ? fromSatoshis(BigInt(balance).toString())
    : fromWei(BigInt(balance).toString());
}

const useFetchTokenBalance = (address: string, chain: string) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const validateAddress = useCallback(
    (address: string, chain: string): boolean => {
      if (chain === 'btc-testnet' || chain.includes('btc')) {
        return isValidBtcAddress(address);
      } else if (chain.includes('eth') || chain.includes('bsc')) {
        return isValidEvmAddress(address);
      }
      return false;
    },
    []
  );

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
    } catch (error: any) {
      console.error('Error fetching balance:', error);
      setError(error.message || 'Failed to fetch balance');
      setBalance(null);
    } finally {
      setLoading(false);
    }
  }, [address, chain]);

  useEffect(() => {
    if (!validateAddress(address, chain)) {
      setError('Invalid address');
      setLoading(false);
      return;
    }
    fetchTokenBalance();
  }, [address, chain, validateAddress, fetchTokenBalance]);

  return { balance, loading, error, refetch: fetchTokenBalance };
};

export default useFetchTokenBalance;
