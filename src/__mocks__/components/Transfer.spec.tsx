import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import MatchMediaMock from 'jest-matchmedia-mock';
import '@testing-library/jest-dom/extend-expect';

import Transfer from '@daoism/components/Transfer';
import { render } from '@daoism/test/test-utils';

let matchMedia: MatchMediaMock;
const networks = [1, 4, 137];

describe('Transfer', () => {
  const Component = <Transfer />;
  const onSubmit = jest.fn();
  const mockGetChainName = jest.fn((valid: boolean) => (valid ? 'Rinkeby' : 'Mainnet'));
  const mockUserBalance = jest.fn(() => 0);
  const formData = {
    receivingWallet: '0x85DEf9F64609DF4ef0c2b88D0aEC8298C78156F9',
    amount: '1',
  };
  beforeAll(() => {
    onSubmit.mockClear();
    matchMedia = new MatchMediaMock();
    render(Component);
  });

  afterEach(() => {
    matchMedia.clear();
    // unmount
  });

  it('submit button is enabled if the form is valid', async () => {
    // TODO: learn more about testing
  });

  it('doesnt display if the network is not rinkeby', () => {
    // see above
  });

  it('button is disabled if user has no balance', () => {
    //
  });
});

function getReceivingWallet() {
  return screen.getByRole('textbox', {
    name: /receiving wallet/i,
  });
}
function getAmount() {
  return screen.getByRole('spinbutton', {
    name: /amount/i,
  });
}

function clickSubmitButton() {
  return user.click(screen.getByRole('button', { name: /transfer tokens/i }));
}
