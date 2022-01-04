import type { ReactElement, ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import type { InMemoryCache } from "@apollo/client";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { CacheProvider } from "@emotion/react";
import { render, RenderOptions } from "@testing-library/react";
import Conditional from "conditional-wrap";

import { ApplicationThemeProvider } from "@/client/theme";
import { createApplicationCache } from "@/client/theme/create";

interface AllProvidersProps {
  children: ReactNode;
  cache?: InMemoryCache;
  mocks?: readonly MockedResponse[];
}

function AllProviders({ children, cache, mocks }: AllProvidersProps) {
  const c = createApplicationCache();

  return (
    <HelmetProvider>
      <CacheProvider value={c}>
        <ApplicationThemeProvider initialMode="light">
          <MockedProvider cache={cache} mocks={mocks}>
            <BrowserRouter>{children}</BrowserRouter>
          </MockedProvider>
        </ApplicationThemeProvider>
      </CacheProvider>
    </HelmetProvider>
  );
}

type RenderOptionsAndMocks = RenderOptions & { mocks?: readonly MockedResponse[]; cache?: InMemoryCache };

export function renderWithProviders(ui: ReactElement, options: RenderOptionsAndMocks = {}) {
  const { wrapper: Component, mocks, cache, ...rest } = options;

  return render(ui, {
    wrapper: ({ children }) => (
      <AllProviders mocks={mocks}>
        <Conditional condition={!!Component} wrap={(el) => (Component ? <Component>{el}</Component> : el)}>
          {children}
        </Conditional>
      </AllProviders>
    ),
    ...rest,
  });
}
