import { renderHook, act } from "@testing-library/react-hooks";

import { useStepper } from "./use-stepper";

describe("useStepper", () => {
  it("should create stepper state", () => {
    const { result } = renderHook(() => useStepper(3));

    expect(result.current.current).toBe(0);
  });

  it("should change stepper value", async () => {
    const { result } = renderHook(() => useStepper(3));

    // initial page
    expect(result.current.current).toBe(0);

    // inc count
    await act(() => result.current.handleNextPage());
    expect(result.current.current).toBe(1);

    // dec count
    await act(() => result.current.handlePrevPage());
    expect(result.current.current).toBe(0);
  });
});
