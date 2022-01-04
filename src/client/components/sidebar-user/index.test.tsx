import type { MockedResponse } from "@apollo/client/testing";
import { fireEvent, waitFor } from "@testing-library/react";

import { renderWithProviders } from "@/__test__/render";
import { EvictRefreshDocument } from "@/client/graphql";
import { accessTokenStorage } from "@/client/providers/storage";

import { SidebarUser } from "./index";

describe("<SidebarUser />", () => {
  it("should render", async () => {
    const { container, getByText } = renderWithProviders(<SidebarUser />);

    const el = container.querySelector("button");
    expect(el).toBeInTheDocument();

    fireEvent.click(el!);

    await waitFor(() => {
      const perfil = getByText(/Perfil/i);
      expect(perfil).toBeInTheDocument();
    });
  });

  it("should logout", async () => {
    const mocks: MockedResponse[] = [
      {
        request: { query: EvictRefreshDocument },
        result: { data: { evictRefresh: true } },
      },
    ];

    accessTokenStorage("somecontent");

    const { container, getByText } = renderWithProviders(<SidebarUser />, { mocks });

    const el = container.querySelector("button");

    expect(el).toBeInTheDocument();
    expect(accessTokenStorage()).toBe("somecontent");

    fireEvent.click(el!);

    await waitFor(() => {
      const exit = getByText(/Sair/i);

      expect(exit).toBeInTheDocument();
      fireEvent.click(exit);

      waitFor(() => {
        expect(accessTokenStorage()).toBe(null);
      });
    });
  });
});
