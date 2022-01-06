import { fireEvent, waitFor } from "@testing-library/react";
import { fromValue, never } from "wonka";

import { renderWithProviders } from "@/__test__/render";
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
    const mockClient = {
      executeMutation: () =>
        fromValue({
          data: {
            evictRefresh: true,
          },
        }),
      query: jest.fn(() => ({ toPromise: () => never })),
    };

    accessTokenStorage.set("somecontent");

    const { container, getByText } = renderWithProviders(<SidebarUser />, { mockClient });

    const el = container.querySelector("button");

    expect(el).toBeInTheDocument();
    expect(accessTokenStorage.get()).toBe("somecontent");

    fireEvent.click(el!);

    await waitFor(() => {
      const exit = getByText(/Sair/i);

      expect(exit).toBeInTheDocument();
      fireEvent.click(exit);
    });

    await waitFor(() => {
      expect(accessTokenStorage.get()).toBe(null);
      expect(mockClient.query).toBeCalled();
    });
  });
});
