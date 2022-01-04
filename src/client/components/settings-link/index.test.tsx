import { FiUser } from "react-icons/fi";

import { renderWithProviders } from "@/__test__/render";

import { SettingsLink } from "./index";

describe("<SettingsLink />", () => {
  it("should render", () => {
    const { getByText } = renderWithProviders(
      <SettingsLink to="/" icon={FiUser} description="description">
        test
      </SettingsLink>
    );

    const el = getByText(/test/i);
    const desc = getByText(/description/i);

    expect(el).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
  });
});
