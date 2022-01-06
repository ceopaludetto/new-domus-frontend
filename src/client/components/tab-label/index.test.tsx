import { FiUser } from "react-icons/fi";

import { renderWithProviders } from "@/__test__/render";

import { TabLabel } from "./index";

describe("<TabLabel />", () => {
  it("should render", () => {
    const { getByText } = renderWithProviders(<TabLabel icon={FiUser}>test</TabLabel>);

    const el = getByText(/test/i);
    expect(el).toBeInTheDocument();
  });
});
