import { createElement } from "react";
import type { To } from "react-router-dom";

import { extractPath, findRouteByName, preloadRoutes } from "./route";
import type { ApplicationRouteConfig } from "./types";

describe("extractPath", () => {
  it("should return pathname if is object", () => {
    const to: To = { pathname: "/" };

    expect(extractPath(to)).toBe("/");
  });

  it("should return as is if is string", () => {
    const to: To = "/";

    expect(extractPath(to)).toBe("/");
  });
});

describe("findRouteByName", () => {
  it("should find by name", () => {
    const name = "@Application:Dashboard";

    expect(findRouteByName(name)).toBeTruthy();
    expect(findRouteByName(name)?.name).toBe(name);
  });

  it("should return undefined if not found", () => {
    const name = "@Application:SomeRandomRoute";

    expect(findRouteByName(name)).toBeFalsy();
  });
});

describe("preloadRoutes", () => {
  it("should find by route", async () => {
    const name = "/";

    expect(await preloadRoutes(name)).toBeTruthy();
  });

  it("should return an empty array if not found", async () => {
    const name = "/some/inexistent/route";

    expect(await preloadRoutes(name)).toStrictEqual([]);
  });

  it("should accept custom routes", async () => {
    const routes: ApplicationRouteConfig[] = [
      {
        path: "/",
        name: "@Any:Route",
        element: createElement("div"),
        component: () => createElement("div"),
      },
    ];

    expect(await preloadRoutes("/", routes)).toStrictEqual(routes);
  });
});
