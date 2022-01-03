import { render } from "@testing-library/react";

import Main from "./index";

describe("Main Page", () => {
  it("should render", () => {
    const { getByText } = render(<Main />);

    const el = getByText(/main/i);
    expect(el).toBeInTheDocument();
  });
});
