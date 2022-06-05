// import { render } from "@testing-library/react";
import Home from "@daoism/pages/index";
import { render } from "@daoism/test/utils";

it('renders homepage unchanged', () => {
  const { container } = render(<Home />);

  expect(container).toMatchInlineSnapshot();
})