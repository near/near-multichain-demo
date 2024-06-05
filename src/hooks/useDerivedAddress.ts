import canonicalize from 'canonicalize';
import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Asset } from '@/data/assets';
import { KeyType } from '@/data/keyTypes';
import { getDomain } from '@/utils/asset';

const useDerivedAddress = (assetType: Asset, keyType: KeyType) => {
  const { deriveAddress, accountId } = useAuth();
  const [derivedAddress, setDerivedAddress] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDerivedAddress = useCallback(async () => {
    setLoading(true);
    try {
      const domain = getDomain(keyType.value);
      const derivationPath = canonicalize(
        domain ? { chain: assetType.value, domain } : { chain: assetType.value }
      );

      if (!derivationPath || !accountId) {
        console.error('Error: Missing derivation path for address generation.');
        return;
      }

      let address = '';

      if (assetType.value === 0) {
        address = await deriveAddress({
          type: 'BTC',
          signerId: accountId,
          path: derivationPath,
          btcNetworkId: 'testnet',
          networkId: 'testnet',
          contract: 'v2.multichain-mpc.testnet',
        });
      } else if (assetType.value === 60) {
        address = await deriveAddress({
          type: 'EVM',
          signerId: accountId,
          path: derivationPath,
          networkId: 'testnet',
          contract: 'v2.multichain-mpc.testnet',
        });
      }

      setDerivedAddress(address);
    } catch (e) {
      console.log('Error fetching derived address', e);
      setError('Failed to derive address');
    } finally {
      setLoading(false);
    }
  }, [accountId, assetType, deriveAddress, keyType.value]);

  useEffect(() => {
    if (assetType && keyType) fetchDerivedAddress();
  }, [assetType, fetchDerivedAddress, keyType]);

  return { derivedAddress, fetchDerivedAddress, loading, error };
};

export default useDerivedAddress;
