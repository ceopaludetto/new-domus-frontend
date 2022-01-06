import { renderWithProviders } from "@/__test__/render";
import { SidebarProvider } from "@/client/utils/hooks";

import { Sidebar } from "./index";

describe("<Sidebar />", () => {
  it("should render", () => {
    const { getByText } = renderWithProviders(<Sidebar />, {
      wrapper: ({ children }) => <SidebarProvider>{children}</SidebarProvider>,
    });

    const el = getByText(/dashboard/i);
    expect(el).toBeInTheDocument();
  });
});
