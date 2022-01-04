import { BrowserRouter, useRoutes } from "react-router-dom";

import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { renderWithProviders } from "@/__test__/render";

import { routes } from "./index";

function goTo(to: string) {
  window.history.pushState({}, "", to);
}

describe("routes", () => {
  it("should render main", async () => {
    goTo("/");

    const { result } = renderHook(() => useRoutes(routes), {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });

    const { getByText } = renderWithProviders(result.current!);

    await waitFor(() => expect(getByText(/main/i)).toBeInTheDocument());
  });

  it("should render authentication", async () => {
    goTo("/authentication");

    const { result } = renderHook(() => useRoutes(routes), {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });

    const { container } = renderWithProviders(result.current!);

    await waitFor(() => expect(container.querySelector("svg")!).toBeInTheDocument());
  });

  it("should render authentication signin", async () => {
    goTo("/authentication/signin");

    const { result } = renderHook(() => useRoutes(routes), {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });

    const { getByText } = renderWithProviders(result.current!);

    await waitFor(() => expect(getByText(/Bem vindo de volta/i)).toBeInTheDocument());
  });

  it("should render authentication forgot", async () => {
    goTo("/authentication/forgot");

    const { result } = renderHook(() => useRoutes(routes), {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });

    const { getByText } = renderWithProviders(result.current!);

    await waitFor(() => expect(getByText(/Recuperar Senha/i)).toBeInTheDocument());
  });
});
