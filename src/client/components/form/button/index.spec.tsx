import * as React from "react";

import { render, fireEvent } from "@/client/utils/setup-test";

import { Button } from "./index";

describe("Button", () => {
  it("should render", () => {
    const { getByText } = render(<Button>Test</Button>);

    const button = getByText("Test");

    expect(button).toBeTruthy();
    expect(button).toHaveProperty("tagName");
    expect(button.tagName).toEqual("BUTTON");
  });

  it("should fire click event", () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Clickabe Test</Button>);

    const button = getByText("Clickabe Test");

    expect(handleClick).toBeCalledTimes(0);
    fireEvent.click(button);
    expect(handleClick).toBeCalledTimes(1);
  });

  it("should have 100% width", () => {
    const { getByText } = render(<Button block>Full Size</Button>);

    const button = getByText("Full Size");

    expect(button).toHaveClass("block");
  });

  it("should have correct color", () => {
    const { getByText } = render(<Button color="secondary">Secondary Button</Button>);

    const button = getByText("Secondary Button");

    expect(button).toHaveClass("secondary");
  });

  it("should have correct variant", () => {
    const { getByText } = render(<Button variant="contained">Raised Button</Button>);

    const button = getByText("Raised Button");

    expect(button).toHaveClass("raised");
  });
});
