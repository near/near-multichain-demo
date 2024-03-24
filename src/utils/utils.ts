export function toWei(eth: number): string {
  const wei = eth * 1e18;
  return wei.toString();
}

export function toSatoshis(btc: number): string {
  const satoshis = btc * 1e8;
  return satoshis.toString();
}

export const getDomain = (keyTypeValue: string): string => {
  if (keyTypeValue === 'domainKey') {
    return window.location.origin;
  } else if (keyTypeValue === 'wrongKey') {
    return 'https://app.unknowndomain.com';
  } else {
    return '';
  }
};

export const getAsset = (assetTypeValue: number): string => {
  if (assetTypeValue === 0) {
    return 'BTC';
  } else if (assetTypeValue === 60) {
    return 'ETH';
  } else {
    return '';
  }
};

export const getValue = (assetTypeValue: number, amount: number): string => {
  if (assetTypeValue === 0) {
    return toSatoshis(amount).toString();
  } else if (assetTypeValue === 60) {
    return toWei(amount).toString();
  } else {
    return '';
  }
};

export const getPayloadAndAsset = (
  assetTypeValue: number,
  keyTypeValue: string,
  amount: number
): { domain: string; asset: string; value: string } => {
  const domain = getDomain(keyTypeValue);
  const asset = getAsset(assetTypeValue);
  const value = getValue(assetTypeValue, amount);
  return { domain, asset, value };
};
