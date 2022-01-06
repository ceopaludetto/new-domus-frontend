import { renderWithProviders } from "@/__test__/render";

import { DontRequireAuth } from "./guards";

describe("<DontRequireAuth />", () => {
  it("should render", () => {
    const { getByText } = renderWithProviders(
      <DontRequireAuth>
        <p>content</p>
      </DontRequireAuth>
    );

    const el = getByText(/content/i);
    expect(el).toBeInTheDocument();
  });
});
