import { screen } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';
import '@testing-library/jest-dom/extend-expect';

import Balances, { BalanceCard, BalanceCardProps, BalancesProps } from '@daoism/components/Balances';
import { tokenList } from '@daoism/lib/constants';
import { displayBalance, getValidChainName } from '@daoism/lib/helpers';
import { render } from '@daoism/test/test-utils';

let matchMedia: MatchMediaMock;
let user: BalancesProps['user'];
let token: BalanceCardProps['token'];

describe('Balances Component', () => {
  const BalancesComponent = <Balances user={user} network={4} tokens={tokenList} />;
  const BalanceCardComponent = <BalanceCard token={token} user={user} />;

  beforeAll(() => {
    matchMedia = new MatchMediaMock();
    user = '0xaBdcbd006De68f3B81FD76049D68Da0d2889CEd4';
    token = '0x85DEf9F64609DF4ef0c2b88D0aEC8298C78156F9';
  });
  afterEach(() => {
    matchMedia.clear();
  });

  afterAll(() => {
    user = '';
    token = '';
  });

  // TODO: remove this test. it 'renders' are less important (and more costly to run) than other tests, especially with transactions.
  it('renders the Balances component', () => {
    const { container } = render(BalancesComponent);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="css-ol85s4"
        >
          <h3
            class="chakra-heading css-1osaa7t"
          >
            Balances
          </h3>
          <div
            class="chakra-stack css-84zodg"
          >
            <span
              class="chakra-text css-qqfgvy"
            >
              Native (
              Rinkeby
              ) balance:
            </span>
            <div
              class="chakra-spinner css-1dn0ijt"
            >
              <span
                class="css-f8n5zr"
              >
                Loading...
              </span>
            </div>
          </div>
          <div
            class="css-1llzcgk"
          >
            <div
              class="chakra-stat css-1uvoero"
            >
              <dl>
                <div
                  class="css-gg4vpm"
                >
                  <div
                    class="css-1sgy36a"
                  >
                    <dt
                      class="chakra-stat__label css-1tendw3"
                    />
                    <dd
                      class="chakra-stat__number css-2u1up0"
                    >
                      <div
                        class="chakra-spinner css-1dn0ijt"
                      >
                        <span
                          class="css-f8n5zr"
                        >
                          Loading...
                        </span>
                      </div>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
            <div
              class="chakra-stat css-1uvoero"
            >
              <dl>
                <div
                  class="css-gg4vpm"
                >
                  <div
                    class="css-1sgy36a"
                  >
                    <dt
                      class="chakra-stat__label css-1tendw3"
                    />
                    <dd
                      class="chakra-stat__number css-2u1up0"
                    >
                      <div
                        class="chakra-spinner css-1dn0ijt"
                      >
                        <span
                          class="css-f8n5zr"
                        >
                          Loading...
                        </span>
                      </div>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
            <div
              class="chakra-stat css-1uvoero"
            >
              <dl>
                <div
                  class="css-gg4vpm"
                >
                  <div
                    class="css-1sgy36a"
                  >
                    <dt
                      class="chakra-stat__label css-1tendw3"
                    />
                    <dd
                      class="chakra-stat__number css-2u1up0"
                    >
                      <div
                        class="chakra-spinner css-1dn0ijt"
                      >
                        <span
                          class="css-f8n5zr"
                        >
                          Loading...
                        </span>
                      </div>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
            <div
              class="chakra-stat css-1uvoero"
            >
              <dl>
                <div
                  class="css-gg4vpm"
                >
                  <div
                    class="css-1sgy36a"
                  >
                    <dt
                      class="chakra-stat__label css-1tendw3"
                    />
                    <dd
                      class="chakra-stat__number css-2u1up0"
                    >
                      <div
                        class="chakra-spinner css-1dn0ijt"
                      >
                        <span
                          class="css-f8n5zr"
                        >
                          Loading...
                        </span>
                      </div>
                    </dd>
                  </div>
                </div>
              </dl>
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
