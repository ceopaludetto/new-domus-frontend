import { routes } from "@/client/providers/routes";

import { findRoute, preload } from "./preload";

describe("preload", () => {
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

  describe("preload", () => {
    it("should preload the component", async () => {
      const client: Record<string, any> = {};
      client.query = jest.fn(() => Promise.resolve());

      const components = await preload("/", { client: client as any });

      expect(Array.isArray(components)).toBe(true);
      expect(typeof components[0]).toBe("function");
      expect(components.length).toBe(2);

      expect(client.query).toBeCalledTimes(0);

      await preload("/auth/signup/step-3", { client: client as any });

      expect(client.query).toBeCalledTimes(1);
    });
  });
});
