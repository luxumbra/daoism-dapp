// import { screen } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';

import '@testing-library/jest-dom/extend-expect';

import { NetworkSwitcher } from '@daoism/components/NetworkSwitcher';
import { render } from '@daoism/test/test-utils';

let matchMedia: MatchMediaMock;
describe('NetworkSwitcher Component', () => {
  const Component = <NetworkSwitcher />;

  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });
  afterEach(() => {
    matchMedia.clear();
  });

  it('renders the Network switcher', () => {
    const { container } = render(Component);
    // const desktopMenu = screen.findByTestId('desktop-menu');
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="chakra-stack css-2nt6bn"
        >
          <span
            class="chakra-text css-ozqb1i"
          >
            r0ng network
          </span>
          <button
            class="chakra-button css-44d4le"
            type="button"
          >
            Change network
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
