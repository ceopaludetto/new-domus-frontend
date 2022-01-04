import { waitFor } from "@testing-library/react";

import { renderWithProviders } from "@/__test__/render";

import { App } from "./app";

describe("<App />", () => {
  it("should render", async () => {
    const { getByText } = renderWithProviders(<App />);

    window.history.pushState({}, "", "/");

    await waitFor(() => {
      const el = getByText(/main/i);
      expect(el).toBeInTheDocument();
    });
  });
});
