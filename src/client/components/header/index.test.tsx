import { renderWithProviders } from "@/__test__/render";
import { SidebarProvider } from "@/client/utils/hooks";

import { Header } from "./index";

describe("<Header />", () => {
  it("should render with given title", () => {
    const { getByText } = renderWithProviders(<Header title="test" />, {
      wrapper: ({ children }) => <SidebarProvider>{children}</SidebarProvider>,
    });

    const el = getByText(/test/i);
    expect(el).toBeInTheDocument();
  });
});
