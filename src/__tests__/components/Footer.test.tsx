import React from 'react';

import { render } from '@testing-library/react';

import { Footer } from '@daoism/components/Footer';

test('renders the site footer', () => {
  const { container } = render(<Footer />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <footer
      class="css-1liiab7"
      data-test="footer-component"
    >
      <div
        class="chakra-stack css-rh6pgv"
      >
        <p
          class="chakra-text css-0"
        >
          Made with 💓 by lux
        </p>
      </div>
    </footer>
  `);
});
