import * as React from "react";

import { Visibility } from "mdi-norm";

import { render, fireEvent } from "@/client/utils/setup-test";

import { IconButton } from "./index";

describe("IconButton", () => {
  it("should render", () => {
    const { getByTestId } = render(
      <IconButton data-testid="1">
        <Visibility />
      </IconButton>
    );

    const button = getByTestId("1");

    expect(button).toBeTruthy();
    expect(button).toHaveProperty("tagName");
    expect(button.tagName).toEqual("BUTTON");
  });

  it("should fire click event", () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <IconButton data-testid="1" onClick={handleClick}>
        <Visibility />
      </IconButton>
    );

    const button = getByTestId("1");

    expect(handleClick).toBeCalledTimes(0);
    fireEvent.click(button);
    expect(handleClick).toBeCalledTimes(1);
  });

  it("should have correct color", () => {
    const { getByTestId } = render(
      <IconButton data-testid="1" color="secondary">
        <Visibility />
      </IconButton>
    );

    const button = getByTestId("1");

    expect(button).toHaveClass("secondary");
  });

  it("should render icon", () => {
    const { getByTestId } = render(
      <IconButton data-testid="1">
        <Visibility />
      </IconButton>
    );

    const button = getByTestId("1");

    expect(button.children[0]).toBeTruthy();
    expect(button.children[0]).toHaveProperty("tagName");
    expect(button.children[0].tagName).toEqual("svg");
  });

  it("should have correct size", () => {
    const { getByTestId } = render(
      <IconButton data-testid="1" size="small">
        <Visibility />
      </IconButton>
    );

    const button = getByTestId("1");

    expect(button).toHaveClass("small");
  });
});
