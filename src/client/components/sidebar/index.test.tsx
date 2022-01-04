import { renderWithProviders } from "@/__test__/render";

import { Sidebar } from "./index";

describe("<Sidebar />", () => {
  it("should render", () => {
    const { getByText } = renderWithProviders(<Sidebar />);

    const el = getByText(/dashboard/i);
    expect(el).toBeInTheDocument();
  });
});
