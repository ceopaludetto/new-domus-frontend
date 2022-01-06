import { ReactElement, ReactNode, StrictMode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import { CacheProvider } from "@emotion/react";
import { render, RenderOptions } from "@testing-library/react";
import Conditional from "conditional-wrap";
import { Provider } from "urql";
import { never } from "wonka";

import { ApplicationThemeProvider } from "@/client/theme";
import { createApplicationCache } from "@/client/theme/create";
import { CondominiumProvider } from "@/client/utils/hooks";

interface AllProvidersProps {
  children: ReactNode;
  mocks?: any;
  condominiumID?: string;
}

function AllProviders({ children, mocks, condominiumID }: AllProvidersProps) {
  const c = createApplicationCache();
  const mockClient: any = {
    executeQuery: jest.fn(() => never),
    executeMutation: jest.fn(() => never),
    executeSubscription: jest.fn(() => never),
    query: jest.fn(() => never),
    ...mocks,
  };

  return (
    <HelmetProvider>
      <CacheProvider value={c}>
        <ApplicationThemeProvider initialMode="light">
          <Provider value={mockClient}>
            <CondominiumProvider initialValue={condominiumID}>
              <BrowserRouter>{children}</BrowserRouter>
            </CondominiumProvider>
          </Provider>
        </ApplicationThemeProvider>
      </CacheProvider>
    </HelmetProvider>
  );
}

type RenderOptionsAndMocks = RenderOptions & { mockClient?: any; condominiumID?: string };

export function renderWithProviders(ui: ReactElement, options: RenderOptionsAndMocks = {}) {
  const { wrapper, mockClient, condominiumID, ...rest } = options;

  return render(ui, {
    wrapper: ({ children }) => (
      <StrictMode>
        <AllProviders mocks={mockClient} condominiumID={condominiumID}>
          <Conditional
            condition={!!wrapper}
            wrap={(el) => {
              const Component = wrapper!;
              return <Component>{el}</Component>;
            }}
          >
            {children}
          </Conditional>
        </AllProviders>
      </StrictMode>
    ),
    ...rest,
  });
}
