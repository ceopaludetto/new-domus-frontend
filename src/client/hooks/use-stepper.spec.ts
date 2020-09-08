import { renderHook, act } from "@testing-library/react-hooks";

import { useStepper } from "./use-stepper";

describe("useStepper", () => {
  it("should create stepper state", () => {
    const { result } = renderHook(() => useStepper(3));

    expect(result.current[0]).toBe(0);
  });

  it("should change stepper value", () => {
    const { result } = renderHook(() => useStepper(3));

    // initial page
    expect(result.current[0]).toBe(0);

    // inc count
    act(() => result.current[1].next());
    expect(result.current[0]).toBe(1);

    // dec count
    act(() => result.current[1].prev());
    expect(result.current[0]).toBe(0);

    // see previous page
    expect(result.current[1].previousPage).toBe(1);

    // toggle to page 2
    act(() => result.current[1].toggle(2));
    expect(result.current[0]).toBe(2);

    // try toggle to inexistent page
    act(() => result.current[1].toggle(10));
    expect(result.current[0]).toBe(2);
  });
});
