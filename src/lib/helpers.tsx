import { Mainnet, Rinkeby, Polygon, NodeUrls } from '@usedapp/core';

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
