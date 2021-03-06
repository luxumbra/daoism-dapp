// import { screen } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';

import '@testing-library/jest-dom/extend-expect';

import { Profile } from '@daoism/components/Profile';
import { render } from '@daoism/test/test-utils';

let matchMedia: MatchMediaMock;
describe('Profile Component', () => {
  const Component = <Profile user="0x78Ec73423B222cB225549bab0d0a812d58808Ffd" />;

  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });
  afterEach(() => {
    matchMedia.clear();
  });

  it('renders the Profile component', () => {
    const { container } = render(Component);
    // const profile = screen.findByTestId('profile-component');
    expect(container).toMatchInlineSnapshot(`
      <div>
        <button
          aria-label="Open wallet"
          class="chakra-button css-1nx5snl"
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
              d="M21 18v1c0 1.1-.9 2-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14c1.1 0 2 .9 2 2v1h-9a2 2 0 00-2 2v8a2 2 0 002 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
            />
          </svg>
        </button>
        <span
          class="chakra-env"
          hidden=""
        />
      </div>
    `);
  });
});
