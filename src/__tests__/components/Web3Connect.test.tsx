// import { screen } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';

import '@testing-library/jest-dom/extend-expect';

import { Web3Connect } from '@daoism/components/Web3Connect';
import { render } from '@daoism/test/test-utils';

let matchMedia: MatchMediaMock;
describe('Web3Connect Component', () => {
  const Component = <Web3Connect />;

  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });
  afterEach(() => {
    matchMedia.clear();
  });

  it('renders the Web3Connect component', () => {
    const { container } = render(Component);
    // const web3Connect = screen.findByTestId('web3connect-component');
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="chakra-stack css-117cgt2"
          data-testid="web3connect-component"
        >
          <button
            aria-label="Login"
            class="chakra-button css-cg7au"
            data-testid="connect-button"
            type="button"
          >
            <svg
              aria-hidden="true"
              fill="currentColor"
              focusable="false"
              height="1em"
              stroke="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0h24v24H0z"
                fill="none"
              />
              <path
                d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"
              />
            </svg>
          </button>
        </div>
        <span
          class="chakra-env"
          hidden=""
        />
      </div>
    `);
  });
});
