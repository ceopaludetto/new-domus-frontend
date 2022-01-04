import { fireEvent, waitFor } from "@testing-library/react";

import { renderWithProviders } from "@/__test__/render";

import { PreloadLink } from "./index";

describe("<PreloadLink />", () => {
  it("should render", () => {
    const { getByText } = renderWithProviders(<PreloadLink to="/">link</PreloadLink>);

    const el = getByText(/link/i);
    expect(el).toBeInTheDocument();
  });

  it("should execute onClick", async () => {
    const fn = jest.fn();
    const { getByText } = renderWithProviders(
      <PreloadLink to="/" onClick={fn}>
        link
      </PreloadLink>
    );

    const el = getByText(/link/i);
    fireEvent.click(el);

    await waitFor(() => {
      expect(fn).toBeCalled();
    });
  });
});
