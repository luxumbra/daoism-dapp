import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import Mint from '@daoism/components/Mint';
// import { render } from '@daoism/test/utils';

test('renders the Mint component', () => {
  render(<Mint />);
  const mint = screen.findByTestId('mint-component');
  expect(mint).toMatchInlineSnapshot(`Promise {}`);
});
