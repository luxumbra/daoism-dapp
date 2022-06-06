// import { screen } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';

import '@testing-library/jest-dom/extend-expect';
// import ERC20_ABI from '@daoism/abis/erc20.abi.json';
import * as constants from '@daoism/lib/constants';
import * as helpers from '@daoism/lib/helpers';
// let matchMedia: MatchMediaMock;

describe('constants', () => {
  // const abiFunctions = [expect.stringContaining('mintTo'), expect.stringContaining('transfer')];
  // const abiString = JSON.stringify(ERC20_ABI);

  it('returns the correct mint/transfer contract address', () => {
    expect(constants.contractAddress).toStrictEqual('0x85DEf9F64609DF4ef0c2b88D0aEC8298C78156F9');
  });

  // it('returns the correct mint/transfer contract abi', () => {

  //   expect(ERC20_ABI).arr(
  //     expect.arrayContaining([
  //       expect.objectContaining({
  //         name: 'mintTo',
  //         type: 'function',
  //       }),
  //       expect.objectContaining({
  //         name: 'transfer',
  //         type: 'function',
  //       }),
  //     ])
  //   );
  // });
});
