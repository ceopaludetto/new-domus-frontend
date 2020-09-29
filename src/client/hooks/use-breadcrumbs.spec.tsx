import * as React from "react";
import { MemoryRouter } from "react-router-dom";

import { renderHook } from "@testing-library/react-hooks";

import { useBreadcrumbs } from "./use-breadcrumbs";

describe("useBreadcrumbs", () => {
  it("should retrive paths", () => {
    const { result } = renderHook(() => useBreadcrumbs(), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
    });

    expect(Array.isArray(result.current)).toBe(true);
    expect(result.current[0].name).toBe("@MAIN");
    expect(result.current[1].name).toBe("@MAIN:HOME");
  });
});
