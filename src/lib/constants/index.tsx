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
// Lux contract on polygon 0x2C0bC596A00D6F1bDfEADff64e9F3b14CcCFafaB
export const contractAddress = '0x85DEf9F64609DF4ef0c2b88D0aEC8298C78156F9'; // Rinkeby dapp token

export const rinkebyTokens = {
  waffle: '0x9ED2135850920BA65566D010B947b49E88651675',
  weth: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  glove: '0x819B3853a76a7Be788412B099f906210CC8FFe2e',
  dapp: '0x85DEf9F64609DF4ef0c2b88D0aEC8298C78156F9',
};
export const mainnetTokens = {
  metagame: '0x30cf203b48edaa42c3b4918e955fed26cd012a3f',
  weth: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  ens: '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72',
};
export const polygonTokens = {
  metagame: '0xeaecc18198a475c921b24b8a6c1c1f0f5f3f7ea0',
  pseed: '0x8A8fCd351ED553Fc75Aecbc566A32F94471f302E',
  lux: '0x2C0bC596A00D6F1bDfEADff64e9F3b14CcCFafaB',
  weth: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
};

export interface TokenProps {
  name: string;
  contract: string;
  chainId: number;
}
export const tokenList: TokenProps[] = [
  {
    name: 'Waffle',
    contract: rinkebyTokens.waffle,
    chainId: Rinkeby.chainId,
  },
  {
    name: 'WETH',
    contract: rinkebyTokens.weth,
    chainId: Rinkeby.chainId,
  },
  {
    name: 'Glove',
    contract: rinkebyTokens.glove,
    chainId: Rinkeby.chainId,
  },
  {
    name: 'Dapp',
    contract: rinkebyTokens.dapp,
    chainId: Rinkeby.chainId,
  },
  {
    name: 'Metagame',
    contract: mainnetTokens.metagame,
    chainId: Mainnet.chainId,
  },
  {
    name: 'ENS',
    contract: mainnetTokens.ens,
    chainId: Mainnet.chainId,
  },
  {
    name: 'Lux',
    contract: polygonTokens.lux,
    chainId: Polygon.chainId,
  },
  {
    name: 'WETH',
    contract: polygonTokens.weth,
    chainId: Polygon.chainId,
  },
  {
    name: 'Metagame',
    contract: polygonTokens.metagame,
    chainId: Polygon.chainId,
  },
  {
    name: 'Pseed',
    contract: polygonTokens.pseed,
    chainId: Polygon.chainId,
  },
];
