/**
 * Converts Ethereum value in Ether to Wei.
 * @param {number} eth - The Ethereum value in Ether.
 * @returns {string} The value in Wei as a string.
 */
export function toWei(eth: number): string {
  const wei = eth * 1e18;
  return wei.toString();
}

/**
 * Converts Bitcoin value in BTC to Satoshis.
 * @param {number} btc - The Bitcoin value in BTC.
 * @returns {string} The value in Satoshis as a string.
 */
export function toSatoshis(btc: number): string {
  const satoshis = btc * 1e8;
  return satoshis.toString();
}
