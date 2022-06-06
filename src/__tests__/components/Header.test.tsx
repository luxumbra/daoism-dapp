// import { render } from '@testing-library/react';

import '@testing-library/jest-dom';
import MatchMediaMock from 'jest-matchmedia-mock';

import { Header } from '@daoism/components/Header';
import { render } from '@daoism/test/utils';

let matchMedia: MatchMediaMock;
describe('Header', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  const Component = <Header />;

  it('renders the site header', () => {
    const { container } = render(Component);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <header
          class="css-18itlj9"
          data-testid="header-component"
        >
          <div
            class="chakra-stack css-1pshbgh"
          >
            <div
              class="css-8zcqwz"
            >
              <span
                class="chakra-text css-i1l6pe"
              >
                DS
              </span>
            </div>
            <button
              aria-controls="disclosure-:r0:"
              aria-expanded="false"
              aria-label="Open menu"
              class="chakra-button css-1ub0glv"
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
                  d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
                />
              </svg>
            </button>
            <div
              class="css-x8c2x7"
              data-testid="mobile-menu"
            />
          </div>
        </header>
        <span
          class="chakra-env"
          hidden=""
        />
      </div>
    `);
  });
});
