import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Asset } from '@/data/assets';
import { KeyType } from '@/data/keyTypes';
import { getDomain } from '@/utils/asset';

const useDerivedAddress = (assetType: Asset, keyType: KeyType) => {
  const { fastAuthWallet } = useAuth();
  const [derivedAddress, setDerivedAddress] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDerivedAddress = useCallback(async () => {
    setLoading(true);
    try {
      const domain = getDomain(keyType.value);
      const accountId =
        (await fastAuthWallet?.getAccounts())?.[0]?.accountId || '';

      if (!assetType.value.toString() || !accountId || !fastAuthWallet) {
        throw new Error('Invalid asset type or account ID');
      }

      let address = '';

      if (assetType.value === 0) {
        address = await fastAuthWallet.getDerivedAddress({
          signerId: accountId,
          path: {
            chain: 0,
            domain,
          },
          btcNetworkId: 'testnet',
          nearNetworkId: 'testnet',
          multichainContractId: 'v2.multichain-mpc.testnet',
        });
      } else if (assetType.value === 60) {
        address = await fastAuthWallet?.getDerivedAddress({
          signerId: accountId,
          path: {
            chain: 60,
            domain,
          },
          nearNetworkId: 'testnet',
          multichainContractId: 'v2.multichain-mpc.testnet',
        });
      }

      setDerivedAddress(address);
    } catch (e) {
      console.log('Error fetching derived address', e);
      setError('Failed to derive address');
    } finally {
      setLoading(false);
    }
  }, [assetType.value, fastAuthWallet, keyType.value]);

  useEffect(() => {
    if (assetType && keyType) fetchDerivedAddress();
  }, [assetType, fetchDerivedAddress, keyType]);

  return { derivedAddress, fetchDerivedAddress, loading, error };
};

export default useDerivedAddress;
