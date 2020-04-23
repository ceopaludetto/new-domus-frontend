import * as React from "react";

import { Button } from "./index";

describe("Button", () => {
  it("should render", () => {
    const markup = <Button>teste</Button>;

    expect(markup).toBeTruthy();
  });
});
