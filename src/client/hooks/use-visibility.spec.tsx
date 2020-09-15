import * as React from "react";

import { ThemeProvider } from "@material-ui/styles";
import { renderHook, act } from "@testing-library/react-hooks";

import { theme } from "@/client/providers/theme";
import { render, fireEvent } from "@/client/utils/setup-test";

import { useVisibility, useMultipleVisibility } from "./use-visibility";

describe("useVisibility", () => {
  it("should render icon button and change input type on click", async () => {
    const { result } = renderHook(() => useVisibility());

    let props = result.current[0]();

    expect(props).toHaveProperty("type");
    expect(props.type).toBe("password");

    if (props.InputProps?.endAdornment) {
      const { container } = render(props.InputProps.endAdornment as any, {
        wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>,
      });

      const button = container.querySelector("button") as HTMLButtonElement;

      act(() => {
        fireEvent.click(button);
      });

      props = result.current[0]();

      expect(props.type).toBe("text");
    }
  });
});

describe("useMultipleVisibility", () => {
  it("should render multiple icon buttons and change input type on click", async () => {
    const { result } = renderHook(() => useMultipleVisibility(["a", "b"]));

    let aProps = result.current[0]("a");
    let bProps = result.current[0]("b");

    expect(aProps).toHaveProperty("type");
    expect(aProps.type).toBe("password");

    expect(bProps).toHaveProperty("type");
    expect(bProps.type).toBe("password");

    if (aProps.InputProps?.endAdornment) {
      const { container } = render(aProps.InputProps?.endAdornment as any, {
        wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>,
      });

      const button = container.querySelector("button") as HTMLButtonElement;

      act(() => {
        fireEvent.click(button);
      });

      aProps = result.current[0]("a");

      expect(aProps.type).toBe("text");
    }

    if (bProps.InputProps?.endAdornment) {
      const { container } = render(bProps.InputProps?.endAdornment as any, {
        wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>,
      });

      const button = container.querySelector("button") as HTMLButtonElement;

      act(() => {
        fireEvent.click(button);
      });

      bProps = result.current[0]("b");

      expect(bProps.type).toBe("text");
    }
  });
});
