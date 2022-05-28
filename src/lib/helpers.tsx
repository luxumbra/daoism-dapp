import { Mainnet, Rinkeby, Polygon } from '@usedapp/core';

export const getCurrentChainName = (id: number) => {
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
