import { Mainnet, Rinkeby, Polygon, NodeUrls } from '@usedapp/core';
import { utils } from 'ethers';

import { testContract } from '@daoism/lib/constants';

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

/**
 * Gets the name of the chain from a list of valid chains
 *
 * TODO: Make this more dry 🌤️
 * @param id The chain id
 * @returns String The name of the chain
 */
export const getValidChainName = (id: number) => {
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
};

/**
 * Gets an array of supported chain id's
 * @param chains The list of valid chains from useConfig
 * @returns Array<number> The valid chain ids
 */
export const getSupportedChains = (chains: NodeUrls | undefined) => {
  const ids: number[] | undefined = chains && Object.keys(chains).map((key) => Number.parseInt(key, 10));

  return ids && ids;
};

export const validateAddress = async (address: string | undefined): Promise<string | undefined | unknown> => {
  let err;
  try {
    await slep(300);
    if (!address) {
      console.log('address is empty');

      err = 'Address is required';
    }
    if (address && !utils.getAddress(address)) {
      console.log('isInvalid', address);
      err = `Invalid address ${address}`;
      throw new Error(err);
    }

    if (address === testContract) {
      err = `Address ${address} is a test contract`;
      throw new Error(err);
    }
    console.log('validatedAddress', address, err);

    return err;
  } catch {
    // console.log('validateAddress', typeof error);
    // err = error.message;
    return err;
  }
};

export const validateAmount = (amount: number | string | undefined) => {
  const number = amount && Number(amount);
  console.log('validateAmount', typeof amount, number);

  let err;
  if (!number || amount === '') {
    err = 'Amount is required';
  }
  if (number && number <= 0) {
    err = 'Amount must be greater than 0';
  }
  if (number && typeof number !== 'number') {
    console.log('invalid amount', typeof number, number);

    err = 'Amount must be a number';
  }

  return err;
};

export const copyString = (text: string): boolean => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
    alert(`Copied to clipboard: ${text}`); // TODO: use toast
    return true;
  }
  return false;
};
