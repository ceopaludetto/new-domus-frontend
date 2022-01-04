import { fireEvent, waitFor } from "@testing-library/react";

import { renderWithProviders } from "@/__test__/render";

import { PreloadNavLink } from "./index";

describe("<PreloadNavLink />", () => {
  it("should render", () => {
    const { getByText } = renderWithProviders(<PreloadNavLink to="/">link</PreloadNavLink>);

    const el = getByText(/link/i);
    expect(el).toBeInTheDocument();
  });

  it("should execute onClick", async () => {
    const fn = jest.fn();
    const { getByText } = renderWithProviders(
      <PreloadNavLink to="/" onClick={fn}>
        link
      </PreloadNavLink>
    );

    const el = getByText(/link/i);
    fireEvent.click(el);

    await waitFor(() => {
      expect(fn).toBeCalled();
    });
  });
});
