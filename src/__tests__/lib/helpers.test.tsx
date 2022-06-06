// import { screen } from '@testing-library/react';
import { TokenInfo } from '@usedapp/core/dist/esm/src/model/TokenInfo';
import { BigNumber } from 'ethers';
import MatchMediaMock from 'jest-matchmedia-mock';

import '@testing-library/jest-dom/extend-expect';
import * as constants from '@daoism/lib/constants';
import * as helpers from '@daoism/lib/helpers';

const tokenInfo: TokenInfo = {
  name: 'dApp',
  decimals: 18,
  symbol: 'DAPP',
  totalSupply: BigNumber.from('10000000000000000000000000000000000000000000000000000'),
};

let inputNumber: BigNumber | undefined;
let shortReturnNumber: string;
let longReturnNumber: string;
let validAddress: string;

describe('helpers', () => {
  beforeAll(() => {
    inputNumber = BigNumber.from('1000000000000000005');
    shortReturnNumber = '1.00000';
    longReturnNumber = '1.000000000000000005';
    validAddress = '0xaBdcbd006De68f3B81FD76049D68Da0d2889CEd4';
  });

  afterAll(() => {
    inputNumber = undefined;
    shortReturnNumber = '';
    longReturnNumber = '';
    validAddress = '';
  });

  it('returns the correct chain name', () => {
    expect(helpers.getValidChainName(4)).toBe('Rinkeby');
    expect(helpers.getValidChainName(1)).toBe('Mainnet');
    expect(helpers.getValidChainName(137)).toBe('Polygon');
    expect(helpers.getValidChainName(9001)).toBe('Unsupported');
  });

  it('checks network validity correctly', () => {
    expect(helpers.getNetworkValidity(4, [4, 1, 137])).toBe(true);
    expect(helpers.getNetworkValidity(1, [4, 1, 137])).toBe(true);
    expect(helpers.getNetworkValidity(137, [4, 1, 137])).toBe(true);
    expect(helpers.getNetworkValidity(9001, [4, 1, 137])).toBe(false);
  });

  // it('returns the display balance correctly', () => {
  //   expect(helpers.displayBalance(inputNumber, tokenInfo)).toContain(
  //     expect.objectContaining({
  //       full: longReturnNumber,
  //       short: shortReturnNumber,
  //     })
  //   );
  // });

  it('validates the amount correctly', () => {
    expect(helpers.validateAmount(2)).toBe(undefined);
    expect(helpers.validateAmount(-1)).not.toBe(undefined);
    expect(helpers.validateAmount('e')).not.toBe(undefined);
    expect(helpers.validateAmount('')).not.toBe(undefined);
    // exp;
  });

  it('validates the address correctly', () => {
    expect(helpers.validateAddress(validAddress)).toBe(undefined);
  });
});
