import { HelmetProvider } from "react-helmet-async";

import { render, waitFor } from "@testing-library/react";

import { ApplicationThemeProvider } from "./index";

describe("<ApplicationThemeProvider />", () => {
  it("should render", () => {
    const { getByText } = render(<ApplicationThemeProvider initialMode="dark">content</ApplicationThemeProvider>, {
      wrapper: ({ children }) => <HelmetProvider>{children}</HelmetProvider>,
    });

    const el = getByText(/content/i);
    expect(el).toBeInTheDocument();

    waitFor(() => {
      const meta = document.head.querySelector("meta");

      expect(meta).toBeInTheDocument();
      expect(meta?.content).toBe("dark");
    });
  });
});
