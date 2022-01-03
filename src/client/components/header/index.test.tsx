import { render } from "@testing-library/react";

import { Header } from "./index";

describe("<Header />", () => {
  it("should render with given title", () => {
    const { getByText } = render(<Header title="test" />);

    const el = getByText(/test/i);
    expect(el).toBeInTheDocument();
  });
});
