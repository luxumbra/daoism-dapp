// import { screen } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';

import '@testing-library/jest-dom/extend-expect';

import { DesktopMenu, MobileMenu, HeaderTools } from '@daoism/components/SiteNav';
import { render } from '@daoism/test/test-utils';

let matchMedia: MatchMediaMock;
describe('SiteNav Component', () => {
  const DesktopComponent = <DesktopMenu />;
  const MobileComponent = <MobileMenu />;
  const HeaderToolsComponent = <HeaderTools />;

  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });
  afterEach(() => {
    matchMedia.clear();
  });

  it('renders the DesktopMenu', () => {
    const { container } = render(DesktopComponent);
    // const desktopMenu = screen.findByTestId('desktop-menu');
    expect(container).toMatchInlineSnapshot(`
      <div>
        <menu
          class="chakra-stack css-zu1d9v"
          data-testid="sitenav"
        />
        <div
          class="chakra-stack css-6xdbpf"
          data-testid="header-tools"
        >
          <button
            aria-label="Toggle dark mode"
            class="chakra-button --no-shadow css-1s10v3h"
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
                d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"
              />
            </svg>
          </button>
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
        </div>
        <span
          class="chakra-env"
          hidden=""
        />
      </div>
    `);
  });

  it('renders the MobileMenu', () => {
    const { container } = render(MobileComponent);
    // const mobileMenu = screen.findByTestId('mobile-menu');
    expect(container).toMatchInlineSnapshot(`
      <div>
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
        <span
          class="chakra-env"
          hidden=""
        />
      </div>
    `);
  });

  it('renders the HeaderTools component', () => {
    const { container } = render(HeaderToolsComponent);
    // const headerTools = screen.findByTestId('header-tools');
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="chakra-stack css-6xdbpf"
          data-testid="header-tools"
        >
          <button
            aria-label="Toggle dark mode"
            class="chakra-button --no-shadow css-1s10v3h"
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
                d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"
              />
            </svg>
          </button>
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
        </div>
        <span
          class="chakra-env"
          hidden=""
        />
      </div>
    `);
  });
});
