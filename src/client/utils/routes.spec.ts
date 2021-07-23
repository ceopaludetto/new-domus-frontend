import { routes } from "@/client/providers/routes";

import { findRoute, findRouteByName, removeDuplicate } from "./routes";

describe("routes", () => {
  describe("findRoute", () => {
    it("should find one or more route per path", () => {
      const finded = findRoute("/", routes, []);

      expect(Array.isArray(finded)).toBe(true);
      expect(finded.length).toBe(2);
      expect(finded[0].name).toBe("@MAIN");
    });

    it("should return empty array if no route are found", () => {
      const finded = findRoute("/blablabla", routes, []);

      expect(finded).toEqual([]);
      expect(finded.length).toBe(0);
    });
  });

  describe("findRouteByName", () => {
    it("should find route by name", () => {
      const route = findRouteByName("@MAIN", routes);

      expect(route).toBeDefined();
      expect(route?.name).toBe("@MAIN");
    });

    it("should find route by cache", () => {
      findRouteByName("@MAIN", routes);
      const route = findRouteByName("@MAIN", routes);

      expect(route).toBeDefined();
      expect(route?.name).toBe("@MAIN");
    });

    it("should find children route by name", () => {
      const route = findRouteByName("@APP:SETTINGS:APPEARANCE", routes);

      expect(route).toBeDefined();
      expect(route?.name).toBe("@APP:SETTINGS:APPEARANCE");
    });
  });

  describe("removeDuplicate", () => {
    it("should remove duplicated routes", () => {
      const route = findRoute("/");

      expect(route.length).toBe(2);
      expect(removeDuplicate(route).length).toBe(1);
    });
  });
});
