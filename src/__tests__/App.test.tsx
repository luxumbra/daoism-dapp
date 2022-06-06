import '@testing-library/jest-dom';
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

  it('should render the page title correctly', () => {
    const { queryByTestId } = render(Component);
    const title = queryByTestId('landing-title');
    expect(title).toBeInTheDocument();
  });
});
