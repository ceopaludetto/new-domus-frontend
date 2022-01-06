import { Tab, Tabs } from "@mui/material";

import { renderWithProviders } from "@/__test__/render";
import { SidebarProvider } from "@/client/utils/hooks";

import { Page } from "./index";

describe("<Page />", () => {
  it("should render", () => {
    const { getByText } = renderWithProviders(<Page title="test">content</Page>, {
      wrapper: ({ children }) => <SidebarProvider>{children}</SidebarProvider>,
    });

    const title = getByText(/test/i);
    const body = getByText(/content/i);

    expect(title).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });

  it("should render tabs if provided", () => {
    const { getByText } = renderWithProviders(
      <Page
        title="test"
        tabs={
          <Tabs value={0}>
            <Tab label="tab" />
          </Tabs>
        }
      >
        content
      </Page>,
      { wrapper: ({ children }) => <SidebarProvider>{children}</SidebarProvider> }
    );

    const tab = getByText(/tab/i);

    expect(tab).toBeInTheDocument();
  });
});
