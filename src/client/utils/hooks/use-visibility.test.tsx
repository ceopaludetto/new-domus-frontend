import { TextField } from "@mui/material";
import { fireEvent, render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { useVisibility } from "./use-visibility";

describe("useVisibility", () => {
  it("should return initialState", () => {
    const { result } = renderHook(() => useVisibility(["test"]));

    expect(result.current.length).toBe(2);
    expect(result.current[0]).toBeInstanceOf(Function);
    expect(result.current[1]).toStrictEqual({ test: false });
    expect(result.current[0]("test")).toHaveProperty("type");
    expect(result.current[0]("test").type).toBe("password");
  });

  it("should toggle onClick", async () => {
    const { result, waitFor } = renderHook(() => useVisibility(["test"]));
    const { container } = render(<TextField {...result.current[0]("test")} />);

    const button = container.querySelector("button");
    expect(button).toBeInTheDocument();

    fireEvent.click(button!);

    await waitFor(() => {
      expect(result.current[0]("test").type).toBe("text");
      expect(result.current[1].test).toBe(true);
    });
  });
});
