import loadable from "@loadable/component";
import { Typography } from "@mui/material";

import { hasFetchBefore, isLazyModule, isLoadable } from "./lazy";

describe("isLoadable", () => {
  it("should check if is a loadable component", () => {
    const Component = Typography;
    const Loadable = loadable(() => import("@mui/material/Typography"));

    expect(isLoadable(Component)).toBeFalsy();
    expect(isLoadable(Loadable)).toBeTruthy();
  });
});

describe("hasFetchBefore", () => {
  it("should check if hasFetchBefore in component", () => {
    const Component = Typography;

    expect(hasFetchBefore(Component)).toBeFalsy();

    function WithFetchBefore() {}
    WithFetchBefore.fetchBefore = async () => {};

    expect(WithFetchBefore).toBeTruthy();
  });
});

describe("isLazyModule", () => {
  it("should check if is lazy module", async () => {
    const Component = Typography;

    expect(isLazyModule(Component)).toBeFalsy();

    const LazyModule = await import("@mui/material/Typography");
    expect(isLazyModule(LazyModule)).toBeTruthy();
  });
});
