import { ethers } from 'ethers';
import { chainExplorerBaseUrls } from '@/utils/constants';

export function toWei(eth: number): string {
  const wei = eth * 1e18;
  return wei.toString();
}

export function toSatoshis(btc: number): string {
  const satoshis = btc * 1e8;
  return satoshis.toString();
}

export function fromWei(wei: string): number {
  return Number(BigInt(wei)) / 1e18;
}

export function fromSatoshis(satoshis: string): number {
  return Number(BigInt(satoshis)) / 1e8;
}

export const getDomain = (keyTypeValue: string): string => {
  if (keyTypeValue === 'domainKey') {
    return window.location.origin;
  } else if (keyTypeValue === 'unknownKey') {
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

export function truncateAddressForDisplay(address: string) {
  if (address.length <= 9) {
    return address; // Return the address as is if it's too short to truncate meaningfully
  }
  const start = address.slice(0, 5);
  const end = address.slice(-6);
  return `${start}....${end}`;
}

export function getTransactionExplorerLink(
  transactionHash: string,
  chainName: string
): string {
  if (!chainExplorerBaseUrls[chainName])
    throw new Error('Unsupported chain name');

  return `${chainExplorerBaseUrls[chainName]}/tx/${transactionHash}`;
}

export function callContractWithDataField(
  functionSignature: string,
  params: any[]
): string | null {
  try {
    const iface = new ethers.Interface([`function ${functionSignature}`]);
    const functionName = functionSignature.split('(')[0];
    const data = iface.encodeFunctionData(functionName, params);
    return data;
  } catch (error) {
    console.error(
      `Error encoding function call for ${functionSignature}:`,
      error
    );
    return null;
  }
}
