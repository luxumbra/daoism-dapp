import { Config, Rinkeby, Mainnet, Polygon } from '@usedapp/core';

export const networksConfig: Config = {
  readOnlyChainId: Rinkeby.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: 'https://speedy-nodes-nyc.moralis.io/20c9b6450fe00e2111db97d6/eth/mainnet',
    [Rinkeby.chainId]: 'https://speedy-nodes-nyc.moralis.io/20c9b6450fe00e2111db97d6/eth/rinkeby',
    [Polygon.chainId]: 'https://speedy-nodes-nyc.moralis.io/20c9b6450fe00e2111db97d6/polygon/mainnet',
  },
  networks: [Mainnet, Rinkeby, Polygon],
};

export const rinkebyTokens = {
  waffle: '0x9ED2135850920BA65566D010B947b49E88651675',
  weth: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  glove: '0x819B3853a76a7Be788412B099f906210CC8FFe2e',
};

export interface TokenProps {
  name: string;
  contract: string;
}
export const tokenList: TokenProps[] = [
  {
    name: 'Waffle',
    contract: rinkebyTokens.waffle,
  },
  {
    name: 'WETH',
    contract: rinkebyTokens.weth,
  },
  {
    name: 'Glove',
    contract: rinkebyTokens.glove,
  },
];
