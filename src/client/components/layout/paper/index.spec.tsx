import * as React from "react";

import { render } from "@/client/utils/setup-test";

import { Paper } from "./index";

describe("Paper", () => {
  it("should render", () => {
    const { getByText } = render(<Paper>Test</Paper>);

    const paper = getByText("Test");

    expect(paper).toBeTruthy();
    expect(paper).toHaveProperty("tagName");
    expect(paper.tagName).toEqual("DIV");
  });

  it("should have size correctly", () => {
    const { getByText } = render(<Paper size="large">Test</Paper>);

    const paper = getByText("Test");

    expect(paper).toHaveClass("large");
  });

  it("should render outline variant", () => {
    const { getByText } = render(<Paper outline>Test</Paper>);

    const paper = getByText("Test");

    expect(paper).toHaveClass("outline");
  });
});
