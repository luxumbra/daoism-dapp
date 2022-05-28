import React from 'react';

import { render } from '@testing-library/react';
import { Footer } from '@daoism/components/Footer';

test('renders the site footer', () => {
  const { container } = render(<Footer />);
  expect(container.firstChild).toMatchInlineSnapshot(`
<footer
  class="css-1buaiyc"
>
  <div
    class="chakra-stack css-14lxv93"
  >
    <div
      class="css-0"
    >
      <p
        class="chakra-text css-0"
      >
        Footer
      </p>
    </div>
  </div>
</footer>
`);
});