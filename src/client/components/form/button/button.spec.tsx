import React from "react";

import { render, fireEvent } from "@/client/utils/setup-test";

import { Button } from "./index";

describe("Button", () => {
  it("should render", async () => {
    const { findByText } = render(<Button>Test</Button>);

    const button = await findByText("Test");

    expect(button).toBeTruthy();
    expect(button).toHaveProperty("tagName");
    expect(button.tagName).toEqual("BUTTON");
  });

  it("should fire click event", async () => {
    let clicked = false;
    const { findByText } = render(
      <Button
        onClick={() => {
          clicked = true;
        }}
      >
        Clickabe Test
      </Button>
    );

    const button = await findByText("Clickabe Test");

    expect(clicked).toBeFalsy();
    fireEvent(
      button,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(clicked).toBeTruthy();
  });

  it("should have 100% width", async () => {
    const { findByText } = render(<Button block>Full Size</Button>);

    const button = await findByText("Full Size");

    expect(button).toHaveClass("block");
  });

  it("should have correct color", async () => {
    const { findByText } = render(<Button color="secondary">Secondary Button</Button>);

    const button = await findByText("Secondary Button");

    expect(button).toHaveClass("secondary");
  });

  it("should have correct variant", async () => {
    const { findByText } = render(<Button variant="raised">Raised Button</Button>);

    const button = await findByText("Raised Button");

    expect(button).toHaveClass("raised");
  });
});
