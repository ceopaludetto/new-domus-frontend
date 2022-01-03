import { Tab, Tabs } from "@mui/material";
import { render } from "@testing-library/react";

import { Page } from "./index";

describe("<Page />", () => {
  it("should render", () => {
    const { getByText } = render(<Page title="test">content</Page>);

    const title = getByText(/test/i);
    const body = getByText(/content/i);

    expect(title).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });

  it("should render tabs if provided", () => {
    const { getByText } = render(
      <Page
        title="test"
        tabs={
          <Tabs>
            <Tab label="tab" />
          </Tabs>
        }
      >
        content
      </Page>
    );

    const tab = getByText(/tab/i);

    expect(tab).toBeInTheDocument();
  });
});
