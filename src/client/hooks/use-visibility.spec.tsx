import * as React from "react";

import { Control } from "@/client/components";
import { render, fireEvent } from "@/client/utils/setup-test";

import { useVisibility, useMultipleVisibility } from "./use-visibility";

function Component() {
  const [map] = useVisibility();

  return <Control id="test" label="test" {...map()} />;
}

function Multiple() {
  const [map] = useMultipleVisibility(["test-1", "test-2"]);

  return (
    <>
      <Control id="test-1" label="test-1" {...map("test-1")} />
      <Control id="test-2" label="test-2" {...map("test-2")} />
    </>
  );
}

describe("useVisibility", () => {
  it("should render icon button and change input type", () => {
    const { getByLabelText } = render(<Component />);

    const input = getByLabelText("test") as HTMLInputElement;
    const button = input.parentElement?.querySelector(".append button") as HTMLButtonElement;

    expect(input).toBeDefined();
    expect(input.type).toBe("password");

    fireEvent.click(button);
    expect(input.type).toBe("text");
  });
});

describe("useMultipleVisibility", () => {
  const { getByLabelText } = render(<Multiple />);

  const input1 = getByLabelText("test-1") as HTMLInputElement;
  const input2 = getByLabelText("test-2") as HTMLInputElement;

  const button1 = input1.parentElement?.querySelector(".append button") as HTMLButtonElement;
  const button2 = input2.parentElement?.querySelector(".append button") as HTMLButtonElement;

  expect(input1).toBeDefined();
  expect(input1.type).toBe("password");

  expect(input2).toBeDefined();
  expect(input2.type).toBe("password");

  fireEvent.click(button1);
  fireEvent.click(button2);

  expect(input1.type).toBe("text");
  expect(input2.type).toBe("text");
});
