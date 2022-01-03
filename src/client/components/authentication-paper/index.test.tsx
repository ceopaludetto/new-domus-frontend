import { render } from "@testing-library/react";

import { AuthenticationPaper } from "./index";

describe("<AuthenticationPaper />", () => {
  it("should render", () => {
    const { getByText } = render(<AuthenticationPaper>test</AuthenticationPaper>);

    const el = getByText(/test/i);
    expect(el).toBeInTheDocument();
  });
});
