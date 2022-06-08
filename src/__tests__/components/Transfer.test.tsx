import MatchMediaMock from 'jest-matchmedia-mock';
import '@testing-library/jest-dom/extend-expect';

import Transfer from '@daoism/components/Transfer';
import { render } from '@daoism/test/test-utils';

let matchMedia: MatchMediaMock;
describe('Transfer Component', () => {
  const Component = <Transfer />;

  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });
  afterEach(() => {
    matchMedia.clear();
  });

  it('renders the Transfer component', () => {
    const { container } = render(Component);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="css-gmuwbf"
          data-testid="transfer"
        >
          <div
            class="chakra-stack css-t0jgq5"
          >
            <h4
              class="chakra-text css-1ae6wvg"
            >
              Send tokens
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
                Transfers only supported on Rinkeby
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
