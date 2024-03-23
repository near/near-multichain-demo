export const getPayloadAndAsset = (
  assetTypeValue: number,
  keyTypeValue: string
): { payload: Record<string, unknown>; asset: string } => {
  const payload: Record<string, unknown> = {
    chain: assetTypeValue,
  };
  if (keyTypeValue === 'domainKey') {
    payload.domain = window.location.origin;
  } else if (keyTypeValue === 'wrongKey') {
    payload.domain = 'https://app.unknowndomain.com';
  } else {
    delete payload.domain;
  }

  let asset = '';
  if (assetTypeValue === 0) {
    asset = 'BTC';
  } else if (assetTypeValue === 60) {
    asset = 'ETH';
  }

  return { payload, asset };
};
