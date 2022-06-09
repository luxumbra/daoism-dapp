import { formatUnits } from '@ethersproject/units';
import { Mainnet, Rinkeby, Polygon, NodeUrls } from '@usedapp/core';
import { TokenInfo } from '@usedapp/core/dist/esm/src/model/TokenInfo';
import { BigNumber, utils } from 'ethers';

import { contractAddress } from '@daoism/lib/constants';

/**
 *  @name slep
 * @description Sleep for a given number of milliseconds
 * @param ms number of milliseconds to sleep
 * @returns Promise
 */
export const slep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export type NetworkValidity = boolean | undefined;
export const getNetworkValidity = (id: number | undefined, networks: number[] | undefined): NetworkValidity => {
  const check = () => !!id && networks?.includes(id);

  try {
    const test = check();
    return test;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Network validity error:', error);

    return false;
    // TODO: Add sentry/honeybadger integration
  }
};

/**
 * Gets the name of the chain from a list of valid chains
 *
 * TODO: Make this more dry 🌤️
 *
 * @param id The chain id
 * @returns String The name of the chain
 */
export const getValidChainName = (id: number) => {
  try {
    switch (id) {
      case Mainnet.chainId:
        return 'Mainnet';
      case Rinkeby.chainId:
        return 'Rinkeby';
      case Polygon.chainId:
        return 'Polygon';
      default:
        return 'Unsupported';
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('getValidChainName error', error);
    return 'chainId error';
  }
};

/**
 * Gets an array of supported chain id's
 * @param chains The list of valid chains from useConfig
 * @returns Array<number> The valid chain ids
 */
export const getSupportedChains = (chains: NodeUrls | undefined) => {
  const ids: number[] | undefined = chains && Object.keys(chains).map((key) => Number.parseInt(key, 10));

  try {
    return ids && ids;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Supported chains error:', error);
    return [];
  }
};

/**
 * Checks a string to see if it is a valid address
 *
 * // TODO: check for ens address in toAddress
 * @param address
 * @returns string | undefined
 */

export const validateAddress = (address: string | undefined): string | undefined => {
  let err: string | undefined;
  try {
    if (!address) {
      err = 'Address is required';
    }
    if (address && address.length !== 42 && !address?.includes('.eth')) {
      err = `Address is not 42 characters long: ${address.length} chars`;
    }
    if (address && !utils.isAddress(address)) {
      err = `Invalid address ${address}`;
    }
    if (address && address.includes('.eth')) {
      err = `ENS is not supported yet`;
    }

    if (address === contractAddress) {
      err = `This is the contract address`;
    }

    return err;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('validateAddress', error);
    return err;
  }
};

/**
 * Vaidates the user input for 'amount' form controls & returns validation feedback
 * @param amount
 * @returns string | undefined
 */
export const validateAmount = (amount: number | string | undefined) => {
  const number = amount && Number(amount);
  let err: string | undefined;

  try {
    if (!number || amount === '') {
      err = 'Amount is required';
    }
    if (number && number <= 0) {
      err = 'Amount must be greater than 0';
    }
    if (number && typeof number !== 'number') {
      err = 'Amount must be a number';
    }
    return err;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Amount validation error', error);
    return 'Amount validation error. See console.';
  }
};

export const copyString = (text: string): boolean => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
    // eslint-disable-next-line no-alert
    alert(`Copied to clipboard: ${text}`); // TODO: use toast
    return true;
  }
  return false;
};

export function displayBalance(num: BigNumber | undefined, info: TokenInfo | undefined) {
  if (num === undefined || info === undefined) {
    return { short: '0', full: '0' };
  }
  const short = Number.parseFloat(formatUnits(num, info?.decimals)).toFixed(5);
  const full = formatUnits(num, info?.decimals);
  return {
    short,
    full,
  };
}
