import * as React from "react";

import { render, fireEvent } from "@/client/utils/setup-test";

import { Control } from "./index";

describe("Control", () => {
  it("should render", () => {
    const { getByLabelText } = render(<Control label="Test" id="test" />);

    const input = getByLabelText("Test");

    expect(input).toBeTruthy();
    expect(input).toHaveProperty("tagName");
    expect(input?.tagName).toEqual("INPUT");
  });

  it("should fire change event", () => {
    const handleChange = jest.fn();

    const { getByLabelText } = render(<Control label="Test" id="test" onChange={handleChange} />);

    const input = getByLabelText("Test");

    expect(handleChange).toBeCalledTimes(0);
    fireEvent.change(input, {
      target: {
        value: 1,
      },
    });
    expect(handleChange).toBeCalledTimes(1);
  });

  it("should not render label", () => {
    const { getByTestId } = render(<Control data-testid="1" />);

    const input = getByTestId("1");

    expect(input.nextElementSibling?.tagName).toEqual("DIV");
    expect(input.nextElementSibling).toHaveClass("effect");
  });

  it("should have correct color", () => {
    const { getByLabelText } = render(<Control color="secondary" label="Secondary" id="secondary" />);

    const input = getByLabelText("Secondary");

    expect(input.nextElementSibling?.nextElementSibling).toHaveClass("secondary");
  });

  it("should render append", () => {
    const { getByLabelText, getByText } = render(<Control label="Append" id="append" append={<div>append</div>} />);

    const input = getByLabelText("Append");
    const append = getByText("append");

    expect(input.nextElementSibling?.nextElementSibling).toHaveClass("append");
    expect(append).toBeTruthy();
  });
});
