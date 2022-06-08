// import { screen } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';

import '@testing-library/jest-dom/extend-expect';
import Mint from '@daoism/components/Mint';
import { render } from '@daoism/test/test-utils';

let matchMedia: MatchMediaMock;

describe('Mint Component', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });
  afterEach(() => {
    matchMedia.clear();
  });

  const Component = <Mint />;

  it('renders the Mint component', () => {
    const { container } = render(Component);
    // const mint = screen.findByTestId('mint-component');
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="css-gmuwbf"
          data-testid="mint-component"
        >
          <div
            class="chakra-stack css-t0jgq5"
          >
            <h4
              class="chakra-heading css-yo6ywq"
            >
              Mintaru
            </h4>
            <span
              class="chakra-text css-c9plv"
            >
              Contract: 0x85DEf9F64609DF4ef0c2b88D0aEC8298C78156F9
            </span>
            <div
              class="chakra-stack css-owjkmg"
            >
              <p
                class="chakra-text css-67e5f8"
              >
                Minting only supported on Rinkeby
              </p>
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
            </div>
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
