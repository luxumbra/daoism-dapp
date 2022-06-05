import { screen } from "@testing-library/react";
import Home from '@daoism/pages/index';

import { render } from '@daoism/test/utils';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /Daoism Systems\!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});

