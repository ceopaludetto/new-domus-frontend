import { HelmetProvider } from "react-helmet-async";

import { render, waitFor } from "@testing-library/react";

import { Fonts } from "./index";

describe("<Fonts />", () => {
  it("should render and add to head", () => {
    render(<Fonts>content</Fonts>, {
      wrapper: ({ children }) => <HelmetProvider>{children}</HelmetProvider>,
    });

    waitFor(() => {
      const links = document.head.querySelectorAll("link");

      expect(links).toBeTruthy();
      expect(links.length).toBe(3);
    });
  });
});
