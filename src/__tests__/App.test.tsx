import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';

import App from '@daoism/App';
import { render } from '@daoism/test/test-utils';

let matchMedia: MatchMediaMock;
describe('App', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  const Component = <App />;

  it('renders the App component', () => {
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
        <main
          class="css-1yj2m6r"
          data-testid="pageSection-component"
        >
          <section
            class="css-13hjh6d"
          >
            <div
              class="css-5jbw7z"
            >
              <h1
                class="chakra-text css-q2y3yl"
                data-testid="landing-title"
              >
                Daoism Systems Challenge
              </h1>
            </div>
          </section>
        </main>
        <footer
          class="css-1liiab7"
          data-testid="footer-component"
        >
          <div
            class="chakra-stack css-1gjzxnz"
          >
            <p
              class="chakra-text css-0"
            >
              Made with 💓 by lux
            </p>
          </div>
        </footer>
        <span
          class="chakra-env"
          hidden=""
        />
        <span
          class="chakra-env"
          hidden=""
        />
      </div>
    `);
  });

  it('should render the page title correctly', () => {
    const { queryByTestId } = render(Component);
    const title = queryByTestId('landing-title');
    expect(title).toBeInTheDocument();
  });
});
