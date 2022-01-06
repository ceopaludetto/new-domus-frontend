import { FiUser } from "react-icons/fi";

import { renderWithProviders } from "@/__test__/render";
import { SidebarProvider } from "@/client/utils/hooks";

import { SidebarItem } from "./index";

describe("<SidebarItem />", () => {
  it("should render", () => {
    const { getByText } = renderWithProviders(
      <SidebarItem to="/" icon={FiUser}>
        test
      </SidebarItem>,
      { wrapper: ({ children }) => <SidebarProvider>{children}</SidebarProvider> }
    );

    const el = getByText(/test/i);
    expect(el).toBeInTheDocument();
  });
});
