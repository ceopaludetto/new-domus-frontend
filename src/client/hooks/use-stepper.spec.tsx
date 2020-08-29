import * as React from "react";

import { render, fireEvent } from "@/client/utils/setup-test";

import { useStepper } from "./use-stepper";

function Component() {
  const [page, { next, prev, toggle, previousPage }] = useStepper(2);

  return (
    <>
      <span data-testid="count">{page}</span>
      <span data-testid="previous-page">{previousPage}</span>
      <button data-testid="next-button" onClick={() => next()}>
        next
      </button>
      <button data-testid="prev-button" onClick={() => prev()}>
        prev
      </button>
      <button data-testid="toggle-button" onClick={() => toggle(1)}>
        toggle
      </button>
      <button data-testid="fail-toggle-button" onClick={() => toggle(5)}>
        toggle
      </button>
    </>
  );
}

describe("useStepper", () => {
  it("should create stepper state", () => {
    const { getByText } = render(<Component />);

    const span = getByText("0");

    expect(span).toBeDefined();
    expect(span.tagName).toBe("SPAN");
    expect(span.textContent).toBe("0");
  });

  it("should change stepper value", () => {
    const { getByTestId } = render(<Component />);

    const next = getByTestId("next-button");
    const prev = getByTestId("prev-button");
    const toggle = getByTestId("toggle-button");
    const previous = getByTestId("previous-page");
    const span = getByTestId("count");

    expect(next).toBeDefined();
    expect(prev).toBeDefined();
    expect(toggle).toBeDefined();

    expect(previous).toBeDefined();

    fireEvent.click(next);
    expect(span.textContent).toBe("1");

    fireEvent.click(prev);
    expect(span.textContent).toBe("0");

    fireEvent.click(toggle);
    expect(span.textContent).toBe("1");
    expect(previous.textContent).toBe("0");
  });

  it("should change stepper value", () => {
    const { getByTestId } = render(<Component />);

    const toggle = getByTestId("fail-toggle-button");
    const span = getByTestId("count");

    expect(toggle).toBeDefined();

    expect(span.textContent).toBe("0");
    fireEvent.click(toggle);
    expect(span.textContent).toBe("0");
  });
});
