import React from 'react';
import * as ReactDOM from 'react-dom';
import { screen } from '@testing-library/react';

import Mint from '@daoism/components/Mint';
import { render } from '@daoism/test/utils';

describe('Mint component test', () => {
  render(<Mint />);
  // let container: HTMLDivElement;

  // beforeEach(() => {
  //   container = document.createElement('div');
  //   document.body.appendChild(container);
  //   ReactDOM.render(<Mint />, container);
  // });

  // afterEach(() => {
  //   document.body.removeChild(container);
  //   container.remove();
  // });

  it('renders the site mint component', () => {
    const mint = screen.getByTestId('mint-component');
    expect(mint).toBeInTheDocument();
  });
});
